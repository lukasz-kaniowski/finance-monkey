var AWS = require('aws-sdk');
var uuid = require('uuid');
if(process.env.AWS_ENDPOINT) {
  AWS.config.update({
    endpoint: process.env.AWS_ENDPOINT
  });
}

var dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports = {
  save: function (type, total) {
    var params = {
      TableName: 'finance-monkey',
      Item: {
        id: uuid.v4(),
        type: type,
        creationDate: new Date().toUTCString(),
        data: { total: total }
      }
    };
    return dynamoDb.put(params).promise();
  }
};
