// Central, tree-shaken imports for the few logos you plan to use.
// Add more imports as needed to avoid pulling 3k+ icons into the bundle.

import siGoogle from 'simple-icons/icons/google.js'
import siDuckduckgo from 'simple-icons/icons/duckduckgo.js'
import siBing from 'simple-icons/icons/bing.js'
import siPerplexity from 'simple-icons/icons/perplexity.js'

// Example extras you might want later (uncomment as needed):
// import siOpenai from 'simple-icons/icons/openai.js'
// import siReddit from 'simple-icons/icons/reddit.js'
// import siGithub from 'simple-icons/icons/github.js'

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
