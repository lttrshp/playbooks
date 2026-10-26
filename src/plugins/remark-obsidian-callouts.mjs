// Renders Obsidian callouts (`> [!tip] Title`) as Starlight asides, so the
// playbooks can be written in Obsidian and still get Starlight's styling.
// Starlight's own `:::tip` syntax shows up as raw text in Obsidian.

const TYPES = {
  note: 'note', info: 'note', abstract: 'note', summary: 'note', todo: 'note',
  tip: 'tip', hint: 'tip', important: 'tip', success: 'tip', check: 'tip',
  done: 'tip', example: 'tip', quote: 'tip',
  warning: 'caution', caution: 'caution', attention: 'caution',
  question: 'caution', help: 'caution', faq: 'caution',
  danger: 'danger', error: 'danger', failure: 'danger', bug: 'danger',
};

const MARKER = /^\[!(\w+)\][+-]?[ \t]*([^\n]*)\n?/;

function transform(node) {
  const paragraph = node.children?.[0];
  const first = paragraph?.type === 'paragraph' ? paragraph.children[0] : undefined;
  if (first?.type !== 'text') return;
  const match = first.value.match(MARKER);
  if (!match) return;

  const kind = match[1].toLowerCase();
  const variant = TYPES[kind] ?? 'note';
  const title = match[2].trim() || kind.charAt(0).toUpperCase() + kind.slice(1);

  first.value = first.value.slice(match[0].length);
  if (!first.value) paragraph.children.shift();
  if (paragraph.children[0]?.type === 'break') paragraph.children.shift();
  const body = paragraph.children.length ? node.children : node.children.slice(1);

  node.data = {
    hName: 'aside',
    hProperties: { 'aria-label': title, className: ['starlight-aside', `starlight-aside--${variant}`] },
  };
  node.children = [
    { type: 'paragraph', data: { hProperties: { className: ['starlight-aside__title'] } }, children: [{ type: 'text', value: title }] },
    { type: 'calloutContent', data: { hName: 'div', hProperties: { className: ['starlight-aside__content'] } }, children: body },
  ];
}

function walk(node) {
  if (node.type === 'blockquote') transform(node);
  for (const child of node.children ?? []) walk(child);
}

export default function remarkObsidianCallouts() {
  return (tree) => walk(tree);
}
