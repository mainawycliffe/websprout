const INLINE_ALLOWED_TAGS = new Set(['a', 'br', 'code', 'em', 'kbd', 'mark', 's', 'strong', 'sub', 'sup', 'u']);

const BLOCK_ALLOWED_TAGS = new Set(['blockquote', 'li', 'ol', 'p', 'pre', 'ul']);

const INLINE_HTML_TAG_RE = /<\/?([a-zA-Z][\w:-]*)(?:\s[^<>]*?)?\s*\/?>/g;
const BLOCK_MARKUP_RE = /^<(blockquote|ol|p|pre|ul)\b/i;

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function normalizeAllowedHtml(source: string, allowedTags: Set<string>) {
  return source.replace(INLINE_HTML_TAG_RE, (match, tagName: string) => {
    if (allowedTags.has(tagName.toLowerCase())) {
      return match;
    }

    return `<code>${escapeHtml(match)}</code>`;
  });
}

export function renderLessonInlineHtml(source: string) {
  return normalizeAllowedHtml(source, INLINE_ALLOWED_TAGS);
}

export function renderLessonHtml(source: string) {
  return source
    .split(/\n{2,}/)
    .map((block) => {
      const trimmed = block.trim();

      if (!trimmed) {
        return '';
      }

      if (BLOCK_MARKUP_RE.test(trimmed)) {
        return normalizeAllowedHtml(trimmed, new Set([...INLINE_ALLOWED_TAGS, ...BLOCK_ALLOWED_TAGS]));
      }

      const lines = trimmed.split('\n').filter((line) => line.trim().length > 0);
      const isBulletList = lines.length > 0 && lines.every((line) => line.trim().startsWith('•'));

      if (isBulletList) {
        const items = lines
          .map((line) => `<li>${renderLessonInlineHtml(line.trim().replace(/^•\s*/, ''))}</li>`)
          .join('');

        return `<ul>${items}</ul>`;
      }

      return `<p>${renderLessonInlineHtml(trimmed).replaceAll('\n', '<br />')}</p>`;
    })
    .filter(Boolean)
    .join('');
}
