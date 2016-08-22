var AWS = require('aws-sdk');
var uuid = require('uuid');
var hlScrapper = require('./hl-scrapper');
var dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handle = function (e, ctx, cb) {
  console.log('event: %j', e);
  hlScrapper.total().then(function (total) {
      console.log('total', total);
      var params = {
        TableName: 'finance-monkey',
        Item: {
          id: uuid.v4(),
          type: 'HL',
          creationDate: new Date().toUTCString(),
          data: { total: total }
        }
      };
      dynamoDb.put(params, cb)
    }
  ).catch(function (error) {
    cb({ event: JSON.stringify(error) });
  })
};

