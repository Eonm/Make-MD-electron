# Make-MD-electron

This project is in alpha.

Some features won't work such as:
- travis config file generation
- gitbook build

## Dependecies

```sh
  make
  curl
  pandoc
  pandoc-citeproc
  pdflatex
```

## Start

```sh
  npm install
  sudo npm install -g gitbook-cli
  npm start
```

## Build

On debian based system

```sh
  sudo apt-get install dpkg-deb
  npm run build
  npm run deb64
```
