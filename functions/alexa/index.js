(() => {
  'use strict';

  const AWS = require('aws-sdk');

  exports.handle = (event, context, callback) => {
    const lambda = new AWS.Lambda();

    lambda.invoke({
      FunctionName: 'finance-monkey_query',
      Payload: '{}'
    }, function (error, data) {
      if (error) {
        return context.done('error', error);
      }

      if (data.Payload) {
        callback(null, {
          "version": "1.0",
          "response": {
            "outputSpeech": {
              "type": "PlainText",
              "text": `Your portfolio today is worth ${JSON.parse(data.Payload)[0].total}`
            },
            "card": {
              "content": `Your portfolio today is worth ${JSON.parse(data.Payload)[0].total}`,
              "title": "Portfolio invoked",
              "type": "Simple"
            },
            "shouldEndSession": true
          },
          "sessionAttributes": {}
        })
      }
    });
  };
})();
