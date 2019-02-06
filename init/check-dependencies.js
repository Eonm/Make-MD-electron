#!/usr/bin/env node

const exec = require('child_process').exec;

const minimalLinuxDependenciesList = [
  'make',
  'curl',
  'pandoc',
  'pandoc-citeproc',
  'pdflatex',
]

function checkDependencies(dependeciesList) {
  return dependeciesList
    .filter((dependecie) => !(dependecie === undefined | dependecie === ''))
    .map((dependecie) => {
    return new Promise(async function(resolve) {
        const check = await checkDependencie(dependecie);
        resolve([dependecie, check]);
     });
  })
}

async function checkDependencie(dependecie) {
  let which = exec(`which ${dependecie}`);
  return new Promise(function(resolve) {
    which.stdout.on('data', function (data) {
      if (data.length > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    })
    which.stderr.on('data', function (data) {
      resolve(false);
    })

    setTimeout(function () {
      resolve(false);
    }, 1000);
  });
}

function checkAppDependencies() {
  return Promise.all(checkDependencies(minimalLinuxDependenciesList));
}

module.exports = {
  checkAppDependencies: checkAppDependencies,
  checkDependencie: checkDependencie,
  checkDependencies: checkDependencies
}
