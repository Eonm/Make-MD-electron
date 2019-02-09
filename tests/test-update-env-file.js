#!/usr/bin/env electron-mocha

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

const {formatEnvData} = require("../workers/update-env-file.js")

describe('formatEnvData()', function() {
  it('should transform array of array to a string', function() {
    let input_data = [["VAR1", "value1"], ["VAR2", "value2"]];
    let value = formatEnvData(input_data);
    expect(value).equal("VAR1=value1\nVAR2=value2");
  });
});
