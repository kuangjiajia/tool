function escapeHTML(target) {
  return target.replace(/&/g, '&amp;')
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function unescapeHTML(target) {
  return target.replace(/&#39;/g, "'")
    .replace(/&quot;/g, "\"")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/, ">")
    .replace(/&amp;/g, "&")
} 