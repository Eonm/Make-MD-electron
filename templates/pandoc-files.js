const pandocConfigs = {
"PDF_CONFIG":`---
title: Your pdf title
author: Your name
bibliography: #
csl: #
documentclass: book #report, memoir, article
classoption: twoside #oneside
link-citations: true
header-includes:
  - \\usepackage[unicode=true]{hyperref}
---`,

"PRESENTATION_CONFIG": `---
title: Your presentation title
author: Your name
bibliography: #
csl: #
link-citations: true
header-includes:
  - \\usepackage[unicode=true]{hyperref}
---`,
"GIT_BOOK_CONFIG": `---
title: Your presentation title
author: Your name
bibliography: #
csl: #
link-citations: true
header-includes:
  - \\usepackage[unicode=true]{hyperref}
---`
}

module.exports = {
  pandocConfigs: pandocConfigs,
}
