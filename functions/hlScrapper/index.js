var hlScrapper = require('./hl-scrapper');
var repository = require('./repository');

exports.handle = function (e, ctx, cb) {
  console.log('event: %j', e);
  hlScrapper.total()
    .then(function (total) {
      console.log('total', total);
      return repository.save('HL', total);
    })
    .then(() => cb())
    .catch(function (error) {
      cb({ event: JSON.stringify(error) });
    })
};

