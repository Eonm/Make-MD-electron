# Make-MD-electron

This project is in alpha.

Some features, such as travis config file generation, won't work.

## Install

Download the last .deb file [here](https://github.com/Eonm/Make-MD-electron/releases).

```sh
  sudo dpkg -i makemd_0.1.0_amd64.deb
  sudo apt-get install -f
```

## Dependecies

```sh
  make
  curl
  pandoc
  pandoc-citeproc
  pdflatex
  nodejs
  npm
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
  # build the .deb package
  sudo apt-get install dpkg-deb
  npm run build
  npm run deb64

  # install the .deb package on your system
  sudo dpkg -i dist/installers/makemd_0.1.0_amd64.deb
  sudo apt-get install -f
```
