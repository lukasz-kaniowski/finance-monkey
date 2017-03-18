process.env.AWS_REGION = "us-west-2";
process.env.AWS_ACCESS_KEY_ID = "access";
process.env.AWS_SECRET_ACCESS_KEY = "secret";
process.env.AWS_ENDPOINT = "http://localhost:8000";
const AWS = require('aws-sdk');
AWS.config.update({
  endpoint: process.env.AWS_ENDPOINT
});

module.exports = new AWS.DynamoDB();
