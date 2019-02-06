#!/usr/bin/env electron-mocha

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

const {parseRawEnvData} = require("../background/load-env-file.js")

describe('#parseRawEnvData()', function() {
  it('should keep data if key:value', function() {
    let input_data = "VAR=data";
    let value = parseRawEnvData(input_data);
    expect(value).deep.equal([ [ 'VAR', 'data' ] ]);
  });
  it('should trim empty variable', function() {
    let input_data = "VAR=";
    let value = parseRawEnvData(input_data);
    expect(value).deep.equal([]);
  });
  it('should trim commented lines', function() {
    let input_data = "#VAR=value";
    let value = parseRawEnvData(input_data);
    expect(value).deep.equal([]);
  });
  it('should handle multi lines', function() {
    let input_data = "#VAR=value\n\nVAR1=value1\nSome random data\nVAR2=value2";
    let value = parseRawEnvData(input_data);
    expect(value).deep.equal([["VAR1", "value1"], ["VAR2", "value2"]]);
  })
});
