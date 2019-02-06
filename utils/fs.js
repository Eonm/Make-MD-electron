const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

async function readFileContent (path) {
  return readFile(path, { encoding: 'utf8' });
}

async function writeFile(path, data) {
 return fs.writeFile(path, data, function(err) {
   if(err) {
      return console.log(err);
   }
 });
}

async function writeFileNotErease(path, data) {
  try {
    fs.open(path,'r', (err, fd) => {
      if (err) {
        writeFile(path, data)
      } else {
        console.log(path + "file already exist : skiping");
      }
    });
  } catch { console.log('failed to create' + path) }
}

module.exports = {
  writeFileNotErease: writeFileNotErease,
  writeFile: writeFile,
  readFileContent: readFileContent
}
