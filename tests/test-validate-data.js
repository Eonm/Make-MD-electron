#!/usr/bin/env electron-mocha

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

const {validateModels, removeEmpytEnvData, validateData} = require("../background/validate-data.js")

const validationModels = {
  zoteroRemoteUserValidation : [
    "Z_API_KEY",
    "Z_USER_ID",
  ],
  zoteroGroupValidation : [
    "Z_GROUP_ID",
  ],
  pandocValidation : [
    "PDF_CONFIG",
    "PRESENTATION_CONFIG",
    "GIT_BOOK_CONFIG"
  ],
  iOValidation : [
    "MD_SRC",
    "PDF_DIR",
    "GIT_BOOK_SRC",
    "GIT_BOOK_DIR",
    "PRESENTATION_SRC",
    "PRESENTATION_DIR",
  ],
  gitbookValidation : [
    "GIT_BOOK_SRC",
    "GIT_BOOK_DIR",
    "GIT_BOOK_CONFIG"
  ],
  presentationValidation : [
    "PRESENTATION_SRC",
    "PRESENTATION_DIR",
    "PRESENTATION_CONFIG"
  ],
  bibliographyValidation : [
    "BIBLIOGRAPHY",
    "CSL_FILE",
    "CSL_STYLE"
  ]
};

describe('#validateModels()', function() {
  it('should validate models', function() {
    let input_data = [["BIBLIOGRAPHY", "./bib.bib"], ["CSL_FILE", "./file.csl"], ["CSL_STYLE", "http://"]];
    let value = validateModels(validationModels,input_data);
    expect(value).deep.equal([
      ["zoteroRemoteUserValidation", false],
      ["zoteroGroupValidation", false],
      ["pandocValidation", false],
      ["iOValidation", false],
      ["gitbookValidation", false],
      ["presentationValidation", false],
      ["bibliographyValidation", true]
    ]);
  });
});

describe('#removeEmpytEnvData()', function() {
  it('should remove empty value from env var', function() {
    let input_data = [["BIBLIOGRAPHY", "./bib.bib"], ["CSL_FILE", ""], ["CSL_STYLE", "http://"]];
    let value = removeEmpytEnvData(input_data);
    expect(value).deep.equal([
      ["BIBLIOGRAPHY", "./bib.bib"],
      ["CSL_STYLE", "http://"]
    ]);
  });
});

describe('#validateData()', function() {
  it('should validate data for one model', function() {
    let input_data = [["BIBLIOGRAPHY", "./bib.bib"], ["CSL_FILE", "./file.csl"], ["CSL_STYLE", "http://"]];
    let model = ["BIBLIOGRAPHY", "CSL_FILE", "CSL_STYLE"]
    let value = validateData(model, input_data);
    expect(value).equal(true);
  });
  it('should not validate data for one model on missing field', function() {
    let input_data = [["BIBLIOGRAPHY", "./bib.bib"], ["CSL_STYLE", "http://"]];
    let model = ["BIBLIOGRAPHY", "CSL_FILE", "CSL_STYLE"]
    let value = validateData(model, input_data);
    expect(value).equal(false);
  });
});
