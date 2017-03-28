process.env.AWS_REGION = "us-west-2";
process.env.AWS_ACCESS_KEY_ID = "access";
process.env.AWS_SECRET_ACCESS_KEY = "secret";
process.env.AWS_ENDPOINT = "http://localhost:8000";
const AWS = require('aws-sdk');
AWS.config.update({
  endpoint: process.env.AWS_ENDPOINT
});
const dynamoDb = new AWS.DynamoDB();

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
function setupTable() {
  return dynamoDb.createTable(params).promise();
}

function destroyTable() {
  return dynamoDb.deleteTable({ TableName: tableName }).promise();
}

function scanTable() {
  return dynamoDb.scan({ TableName: tableName }).promise();
}

module.exports = {
  dynamoDb,
  setupTable,
  destroyTable,
  scanTable,
};
