var AWS = require('aws-sdk');
if(process.env.AWS_ENDPOINT) {
  AWS.config.update({
    endpoint: process.env.AWS_ENDPOINT
  });
}

var dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports = {
  getAll: function () {
    var params = {
      TableName: 'finance-monkey',
    };
    return dynamoDb.scan(params).promise();
  }
};
