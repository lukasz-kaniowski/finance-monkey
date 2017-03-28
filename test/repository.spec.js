const expect = require('chai').expect;
const dynamoDb = require('./support/in-memory-dynamodb');
const repository = require('../functions/hlScrapper/repository');

describe('Repository', () => {


  before(() => dynamoDb.setupTable());

  after(() => dynamoDb.destroyTable());

  it('should save total into dynamodb', () =>
    repository.save('HL', '123')
      .then(() => dynamoDb.scanTable())
      .then((res) => {
          expect(res.Items[0].type).to.eql({ S: 'HL' });
          expect(res.Items[0].data).to.eql({ M: { total: { S: '123' } } });
        }
      )
  )
});
