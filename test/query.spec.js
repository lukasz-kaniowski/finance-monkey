'use strict';
const dynamoDb = require('./support/in-memory-dynamodb');
const context = require('aws-lambda-mock-context');
const expect = require('chai').expect;
const queryFunction = require('../functions/query');
const repository = require('../functions/hlScrapper/repository');

describe('Query function', () => {
  let result;

  after(() => dynamoDb.destroyTable());

  before((done) => {
    dynamoDb.setupTable()
      .then(() => repository.save('Hl', 10))
      .then(() => new Promise(resolve => setTimeout(resolve, 1000)))
      .then(() => repository.save('Hl', 20))
      .then(() => {
        queryFunction.handle({}, context(), (error, result) => {
          this.result = result;
          done();
        })
      })
      .catch(err => done(err));
  });

  it('result should not be empty', () => {
    expect(this.result).to.not.be.empty
  });

  it('should return all of the db items', () => {
    expect(this.result.length).to.equal(2)
  });

  it('should have correct type', () => {
    expect(this.result[0]).to.have.property('type', 'Hl');
    expect(this.result[1]).to.have.property('type', 'Hl');
  });
  it('should have correct total', () => {
    expect(this.result[0]).to.have.property('total', 20);
    expect(this.result[1]).to.have.property('total', 10);
  });

  it('should have not empty created date', () => {
    expect(this.result[0]).to.have.property('createdDate');
    expect(this.result[1]).to.have.property('createdDate');
  });
});
