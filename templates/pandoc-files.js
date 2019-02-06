const pandocConfigs = {
"PDF_CONFIG":`---
title: Your pdf title
author: Your name
bibliography: ./bib/bib.bib
csl: #
documentclass: book #report, memoir, article
classoption: twoside #oneside
link-citations: true
header-includes:
  - \\usepackage[french]{babel}
  - \\usepackage[unicode=true]{hyperref}
---`,

"PRESENTATION_CONFIG": `---
title: Your presentation title
author: Your name
bibliography: ./bib/bib.bib
csl: #
link-citations: true
header-includes:
  - \\usepackage[french]{babel}
  - \\usepackage[unicode=true]{hyperref}
---`,
"GIT_BOOK_CONFIG": `---
title: Your presentation title
author: Your name
bibliography: ./bib/bib.bib
csl: #
link-citations: true
header-includes:
  - \\usepackage[french]{babel}
  - \\usepackage[unicode=true]{hyperref}
---`
}

module.exports = {
  pandocConfigs: pandocConfigs,
}
