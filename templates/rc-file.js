const rcFileTemplate = `BIBLIOGRAPHY=./bib/bib.bib
CSL_STYLE=apa-5th-edition
CSL_FILE=./bib/style.csl
MD_SRC=./md/
PDF_DIR=./pdf/
PRESENTATION_SRC=./md/
PRESENTATION_DIR=./presentation/
GIT_BOOK_SRC=./md/
GIT_BOOK_DIR=./gitbook/
PDF_CONFIG=./config/pdf.yml
PRESENTATION_CONFIG=./config/presentation.yml
GIT_BOOK_CONFIG=./config/gitbook.yml
`

module.exports = {
  rcFileTemplate: rcFileTemplate
}
