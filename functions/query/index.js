const repository = require('./repository');

exports.handle = (e, ctx, done) => {
  repository.getAll()
    .then(dbResult => {
      var result = dbResult.Items
        .map(item => (
            {
              type: item.type,
              total: item.data.total,
              createdDate: item.creationDate
            }
          )
        ).sort((a,b) => new Date(b.createdDate) - new Date(a.createdDate));
      done(null, result);
    }).catch(done)

};

