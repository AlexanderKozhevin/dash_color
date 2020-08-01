var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const URL = 'mongodb://localhost:27017'
// const URL = (process.env.NODE_ENV == 'production') ?  'mongodb://localhost:27017' : 'mongodb://localhost:27017'
var state = {
		db: null
}

exports.connect = function(done) {
  if (state.db) return done()
  MongoClient.connect(URL, { useNewUrlParser: true }, function(err, db) {
    if (err) return done(err)
    state.db = db.db('colorizer')
    done()
  })
}

exports.get = function() {
  return state.db
}

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      done(err)
    })
  }
}

exports.ObjectID = ObjectID;
