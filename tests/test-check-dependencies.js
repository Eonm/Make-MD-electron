#!/usr/bin/env electron-mocha

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

const { checkDependencie, checkDependencies } = require("../init/check-dependencies.js");

describe('#checkDependencie()', function() {
  it('should check one dependecie', async function() {
    let input_data = "sh";
    let value = await checkDependencie(input_data);
    expect(value).equal(true);
  });
  it('should not check empty dependecie', async function() {
    let input_data = "";
    let value = await checkDependencie(input_data);
    expect(value).equal(false);
  });
  it('should not check invalid dependecie', async function() {
    let input_data = "123456789";
    let value = await checkDependencie(input_data);
    expect(value).equal(false);
  });
});

describe('#checkDependencies()', function() {
  it('should check dependecies', async function() {
    let input_data = ["sh", "python"];
    let value = await Promise.all(checkDependencies(input_data));
    expect(value).deep.equal([ [ 'sh', true ], [ 'python', true ] ]);
  });
  it('should check only valid dependecies', async function() {
    let input_data = ["sh", "123456789"];
    let value = await Promise.all(checkDependencies(input_data));
    expect(value).deep.equal([ [ 'sh', true ], [ '123456789', false ] ]);
  });
  it('should not check empty dependecies', async function() {
    let input_data = [""];
    let value = await Promise.all(checkDependencies(input_data));
    expect(value).deep.equal([ ]);
  });
});
