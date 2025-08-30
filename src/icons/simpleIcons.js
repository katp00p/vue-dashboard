// src/icons/simpleIcons.js
// One place to grab Simple Icons. No Bing here (removed upstream).
// Uses a root namespace import so it works across package versions.

import * as SI from 'simple-icons'

// Only import icons that actually exist in your installed version:
const { siGoogle, siDuckduckgo, siPerplexity } = SI

export const SI_MAP = {
  google: siGoogle,
  duckduckgo: siDuckduckgo,
  perplexity: siPerplexity,
  // NOTE: No 'bing' here — we use Font Awesome for Bing in the provider list.
}

export function getSimpleIcon(slug) {
  return SI_MAP[slug] || null
}
