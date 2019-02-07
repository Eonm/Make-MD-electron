const gitbookScript = `#!/usr/bin/env bash
counter=0

rm ./book.json
touch ./book.json
touch $GIT_BOOK_SRC/README.md

echo "{ \\"root\\": \\"./\${GIT_BOOK_DIR}\\" }" > ./book.json

rm -r -f \${GIT_BOOK_DIR}
mkdir -p \${GIT_BOOK_DIR}
cp \${GIT_BOOK_SRC}*.md \${GIT_BOOK_DIR}
cp -r \${GIT_BOOK_SRC}styles/ \${GIT_BOOK_DIR} 2>/dev/null

touch \${GIT_BOOK_DIR}SUMMARY.md
echo -e "# Table of content\n" > \${GIT_BOOK_DIR}SUMMARY.md

for file in $(ls \${GIT_BOOK_DIR}/*.md -A1) ; do
    if [ $file == "\${GIT_BOOK_DIR}/SUMMARY.md" ] || [ $file == "\${GIT_BOOK_DIR}/README.md" ] ; then
        continue;
    fi

    let "counter+=1"

    mkdir \${GIT_BOOK_DIR}chapter-$counter
    t=$(grep -m 1 "# " $file | sed "s/# //")
    h=$(head -n 1 $file)
    title=\${t:-$h}

    pandoc --filter pandoc-citeproc --bibliography $BIBLIOGRAPHY --csl $CSL_FILE -t html $file $GIT_BOOK_CONFIG -o $file

    mv $file \${GIT_BOOK_DIR}chapter-$counter
    echo "* ["$title"]("./chapter-$counter/$(basename $file)")" >> \${GIT_BOOK_DIR}SUMMARY.md
done
`

module.exports = {
  gitbookScript: gitbookScript
}
