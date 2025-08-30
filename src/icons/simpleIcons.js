// src/icons/simpleIcons.js
// Use named exports from the aggregator for best Vite compatibility.
// (Avoid per-file paths like 'simple-icons/icons/google.js')

import {
  siGoogle,
  siDuckduckgo,
  siBing,
  siPerplexity,
  // Add more here as needed:
  // siOpenaigym as siOpenai, // example of aliasing if slugs differ
  // siReddit,
  // siGithub,
} from 'simple-icons/icons'

export const SI_MAP = {
  google: siGoogle,
  duckduckgo: siDuckduckgo,
  bing: siBing,
  perplexity: siPerplexity,
  // openai: siOpenai,
  // reddit: siReddit,
  // github: siGithub,
}

export function getSimpleIcon(slug) {
  return SI_MAP[slug] || null
}
