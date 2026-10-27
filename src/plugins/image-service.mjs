// Astro's sharp service, with a higher default quality. Markdown images can't
// set a quality, and sharp's default (80) visibly softens the small UI text in
// dashboard screenshots, which are already JPEG-compressed once.
import sharpService from 'astro/assets/services/sharp';

const DEFAULT_QUALITY = 92;

export default {
  ...sharpService,
  transform(inputBuffer, transform, config) {
    return sharpService.transform(inputBuffer, { ...transform, quality: transform.quality ?? DEFAULT_QUALITY }, config);
  },
};
