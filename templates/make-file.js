const makeFileTemplate = `#!make
include .env
export $(shell sed 's/=.*//' .env)

.PHONY= pdf gitbook update-bib update-csl clear get-output-name mkdir-template download-impress-components download-revealjs-components create-doc

output-name:= $(shell grep "title: " $(PDF_CONFIG) | sed -e "s/title: //" | sed -e "s/\\s/-/g")

build-all : pdf presentation gitbook

update-bib: mkdir-bib
ifneq ($(strip $(BIBLIOGRAPHY_SRC)),)
	cp "$(BIBLIOGRAPHY_SRC)" "$(BIBLIOGRAPHY)"
else
ifeq (,$(wildcard  $(BIBLIOGRAPHY)))
ifneq ($(strip $(Z_USER_ID)),)
ifneq ($(strip $(Z_COLLECTION)),)
	@curl -s --header "Zotero-API-Key:$(Z_API_KEY)" https://api.zotero.org/users/$(Z_USER_ID)/collections/$(Z_COLLECTION)/items?format=biblatex > /tmp/bibliography.bib
	grep -v 'An error occurred' /tmp/bibliography.bib
	grep -v 'Collection not found' /tmp/bibliography.bib
	@mv /tmp/bibliography.bib $(BIBLIOGRAPHY)
else
	echo "all user items"
	@curl -s --header "Zotero-API-Key:$(Z_API_KEY)" https://api.zotero.org/users/$(Z_USER_ID)/items?format=biblatex > /tmp/bibliography.bib
	grep -v 'An error occurred' /tmp/bibliography.bib
	grep -v 'Collection not found' /tmp/bibliography.bib
	@mv /tmp/bibliography.bib $(BIBLIOGRAPHY)
endif
else
ifneq ($(strip $(Z_GROUP_ID)),)
ifneq ($(strip $(Z_GROUP_COLLECTION)),)
	@curl https://api.zotero.org/groups/$(Z_GROUP_ID)/collections/$(Z_GROUP_COLLECTION)/items?format=biblatex > /tmp/bibliography.bib
	grep -v 'An error occurred' /tmp/bibliography.bib
	grep -v 'Collection not found' /tmp/bibliography.bib
	@mv /tmp/bibliography.bib $(BIBLIOGRAPHY)
else
	@curl https://api.zotero.org/groups/$(Z_GROUP_ID)/items?format=biblatex > /tmp/bibliography.bib
	grep -v 'An error occurred' /tmp/bibliography.bib
	grep -v 'Collection not found' /tmp/bibliography.bib
	@mv /tmp/bibliography.bib $(BIBLIOGRAPHY)
endif
endif
endif
endif
endif

update-bib-force: mkdir-bib
ifneq ($(strip $(BIBLIOGRAPHY_SRC)),)
	@cp "$(BIBLIOGRAPHY_SRC)" "$(BIBLIOGRAPHY)"
else
ifneq ($(strip $(Z_USER_ID)),)
ifneq ($(strip $(Z_COLLECTION)),)
	@curl -s --header "Zotero-API-Key:$(Z_API_KEY)" https://api.zotero.org/users/$(Z_USER_ID)/collections/$(Z_COLLECTION)/items?format=biblatex -o /tmp/bibliography.bib
	grep -v 'An error occurred' /tmp/bibliography.bib
	grep -v 'Collection not found' /tmp/bibliography.bib
	@mv /tmp/bibliography.bib $(BIBLIOGRAPHY)
else
	@echo "all user items"
	@curl -s --header "Zotero-API-Key:$(Z_API_KEY)" https://api.zotero.org/users/$(Z_USER_ID)/items?format=biblatex -o /tmp/bibliography.bib
	grep -v 'An error occurred' /tmp/bibliography.bib
	grep -v 'Collection not found' /tmp/bibliography.bib
	@mv /tmp/bibliography.bib $(BIBLIOGRAPHY)
endif
else
ifneq ($(strip $(Z_GROUP_ID)),)
ifneq ($(strip $(Z_GROUP_COLLECTION)),)
	@curl https://api.zotero.org/groups/$(Z_GROUP_ID)/collections/$(Z_GROUP_COLLECTION)/items?format=biblatex -o /tmp/bibliography.bib
	grep -v 'An error occurred' /tmp/bibliography.bib
	grep -v 'Collection not found' /tmp/bibliography.bib
	@mv /tmp/bibliography.bib $(BIBLIOGRAPHY)
else
	@curl https://api.zotero.org/groups/$(Z_GROUP_ID)/items?format=biblatex -o /tmp/bibliography.bib
	grep -v 'An error occurred' /tmp/bibliography.bib
	grep -v 'Collection not found' /tmp/bibliography.bib
	@mv /tmp/bibliography.bib $(BIBLIOGRAPHY)
endif
endif
endif
endif

update-csl: mkdir-csl
ifneq ($(CSL_FILE),)
	echo "updating csl file"
	@wget https://raw.githubusercontent.com/citation-style-language/styles/master/$(CSL_STYLE).csl -O /tmp/style.csl
	@mv /tmp/style.csl $(CSL_FILE)
endif

update-csl-force: mkdir-csl
ifneq ($(CSL_FILE),)
	echo $(CSL_STYLE)
	@wget https://raw.githubusercontent.com/citation-style-language/styles/master/$(CSL_STYLE).csl -O /tmp/style.csl
	@mv /tmp/style.csl $(CSL_FILE)
endif

pdf: mkdir-pdf update-bib update-csl
	sed -e "s/^#title:/title:/" -i $(PDF_CONFIG);
	sed -e "s/^#author:/author:/" -i $(PDF_CONFIG);
ifneq ("$(wildcard $(BIBLIOGRAPHY))","")
	echo "bib"
	output="$$(grep "title:" $(PDF_CONFIG) | sed -e "s/title: //" | sed -e "s/\\s/-/g")"; \\
	pandoc --toc -N -s $(MD_SRC)*.md $(PDF_CONFIG) -o $(PDF_DIR)$$output.pdf --filter pandoc-citeproc --bibliography $(BIBLIOGRAPHY) --csl $(CSL_FILE)
else
	output="$$(grep "title:" $(PDF_CONFIG) | sed -e "s/title: //" | sed -e "s/\\s/-/g")"; \\
	pandoc --toc -N -s $(MD_SRC)*.md $(PDF_CONFIG) -o $(PDF_DIR)$$output.pdf
endif

pdf-individualy: mkdir-pdf update-bib update-csl
	sed -e "s/^title:/#title:/" -i $(PDF_CONFIG);
	sed -e "s/^author:/#author:/" -i $(PDF_CONFIG);
ifneq ("$(wildcard $(BIBLIOGRAPHY))","")
	@for file in $(MD_SRC)* ; do \\
		output="$$(grep "title: " $$file | sed -e "s/title: //" | sed -e "s/\s/-/g")"; \\
		pandoc --toc -N -s $$file $(PDF_CONFIG) -o $(PDF_DIR)$$output.pdf --filter pandoc-citeproc --bibliography $(BIBLIOGRAPHY) --csl $(CSL_FILE) ; \\
	done
else
	@for file in $(MD_SRC)* ; do \\
		output="$$(grep "title: " $$file | sed -e "s/title: //" | sed -e "s/\\s/-/g")"; \\
		pandoc --toc -N -s $$file $(PDF_CONFIG) -o $(PDF_DIR)$$output.pdf; \\
	done
endif

download-revealjs-components: mkdir-presentation
ifeq (,$(wildcard  presentation/master.tar.gz))
	@curl -s -L https://github.com/hakimel/reveal.js/archive/master.tar.gz > /tmp/revealJS
	@mv /tmp/revealJS $(PRESENTATION_DIR)master.tar.gz
	@rm -f -r $(PRESENTATION_DIR)reveal.js
	@tar -xzvf $(PRESENTATION_DIR)master.tar.gz -C $(PRESENTATION_DIR)
	@mv $(PRESENTATION_DIR)reveal.js-master $(PRESENTATION_DIR)reveal.js
endif

md-pretify:
	./.script/md_pretify.sh

gitbook: update-bib update-csl
	gitbook install
	chmod +x $(dir $(realpath $(firstword $(MAKEFILE_LIST))))create-gitbook.sh
	$(dir $(realpath $(firstword $(MAKEFILE_LIST))))create-gitbook.sh
	gitbook build

serve-doc:
	@gitbook serve

presentation: download-revealjs-components update-bib update-csl
	echo "making presentation"
ifneq ("$(wildcard $(BIBLIOGRAPHY))","")
	@pandoc -t revealjs -s -o $(PRESENTATION_DIR)$(output-name)_slides.html $(PRESENTATION_SRC)*.md $(PRESENTATION_CONFIG) -V revealjs-url=./reveal.js --filter pandoc-citeproc --bibliography $(BIBLIOGRAPHY) --csl $(CSL_FILE)
else
	@pandoc -t revealjs -s -o $(PRESENTATION_DIR)$(output-name)_slides.html $(PRESENTATION_SRC)*.md $(PRESENTATION_CONFIG) -V revealjs-url=./reveal.js
endif

mkdir-pdf:
	@mkdir -p $(PDF_DIR)

mkdir-bib:
ifneq ($(BIBLIOGRAPHY),)
	@mkdir -p \`dirname $(BIBLIOGRAPHY)\`
endif

mkdir-csl:
ifneq ($(CSL_FILE),)
	@mkdir -p \`dirname $(CSL_FILE)\`
endif

mkdir-presentation:
	@mkdir -p $(PRESENTATION_DIR)

clear:
	@rm -f -r \`dirname $(BIBLIOGRAPHY)\`
	@rm -f -r $(GIT_BOOK_DIR)
	@rm -f book.json
	@rm -f -r _book/
	@rm -f -r $(PDF_DIR)
	@rm -f -r $(PRESENTATION_DIR)
`

module.exports = {
  makeFileTemplate: makeFileTemplate
}
