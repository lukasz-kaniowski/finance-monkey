process.env.AWS_REGION = "us-west-2";
process.env.AWS_ACCESS_KEY_ID = "access";
process.env.AWS_SECRET_ACCESS_KEY = "secret";
process.env.AWS_ENDPOINT = "http://localhost:8000";
const repository = require('../functions/hlScrapper/repository');
const AWS = require('aws-sdk');
const expect = require('chai').expect;
AWS.config.update({
  endpoint: process.env.AWS_ENDPOINT
});

const dynamoDb = new AWS.DynamoDB();

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

  before(()=> dynamoDb.createTable(params).promise());

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
