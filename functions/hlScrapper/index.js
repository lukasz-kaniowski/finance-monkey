var hlScrapper = require('./hl-scrapper');
var repository = require('./repository');

exports.handle = (e, ctx, done) => {
  hlScrapper.total()
    .then(total => {
      console.log('total', total);
      return repository.save('HL', total);
    })
    .then(() => {
      console.log('success');
      done();
    })
    .catch(function (error) {
      console.log(`ERROR - ${JSON.stringify(error)}`);
      done(`ERROR - ${JSON.stringify(error)}`);
    })
};

