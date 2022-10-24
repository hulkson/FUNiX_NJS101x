const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://root:Hulkson052@cluster0.b0zgemo.mongodb.net/?retryWrites=true&w=majority')
    .then((client) => {
      _db = client.db('shop');
      callback();
    }).catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No Database Found!';
}

exports.mongoConnect = mongoConnect; // duy trì kết với với db
exports.getDb = getDb; //cung cấp quyền truy cập để tương tác với db trong pool