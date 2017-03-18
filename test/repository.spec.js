const expect = require('chai').expect;
const dynamoDb = require('./support/in-memory-dynamodb');
const repository = require('../functions/hlScrapper/repository');

describe('Repository', () => {
  const tableName = "finance-monkey";
  const params = {
    TableName: tableName,
    KeySchema: [
      { AttributeName: "id", KeyType: "HASH" }
    ],
    AttributeDefinitions: [
      { AttributeName: "id", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  };

  before(() => dynamoDb.createTable(params).promise());

  after(() => dynamoDb.deleteTable({ TableName: tableName }).promise());

  it('should save total into dynamodb', () =>
    repository.save('HL', '123')
      .then(() => dynamoDb.scan({ TableName: tableName }).promise())
      .then((res) => {
          expect(res.Items[0].type).to.eql({ S: 'HL' });
          expect(res.Items[0].data).to.eql({ M: { total: { S: '123' } } });
        }
      )
  )
});
