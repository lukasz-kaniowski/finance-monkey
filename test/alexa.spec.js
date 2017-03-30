'use strict';
const context = require('aws-lambda-mock-context');
const AWS = require('aws-sdk-mock');
const expect = require('chai').expect;
const alexaSkill = require('../functions/alexa');

describe('alexa skill', () => {

  const payloadTotal = '£200.13';
  let lambdaFunctionName;
  AWS.mock('Lambda', 'invoke', function (params, callback) {
    lambdaFunctionName = params.FunctionName;
    callback(null, {
      Payload: JSON.stringify([
        { total: payloadTotal }
      ])
    });
  });

  before((done) => {
    alexaSkill.handle({}, context(), (error, result) => {
      this.result = result;
      this.error = error;
      done();
    })
  });

  it('should not error', () => {
    expect(this.error).to.be.null
  });

  it('should call correct lambda function to retrieve data', () =>
    expect(lambdaFunctionName).to.equal('finance-monkey_query')
  );

  it('should return response with portfolio total', () =>
    expect(this.result).to.have.deep
      .property('response.outputSpeech.text', `Your portfolio today is worth ${payloadTotal}`)
  );


});
