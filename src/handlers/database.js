const mongoose = require('mongoose');

const { MongoMemoryServer } = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();

module.exports.connect = async () => {
  const uri = await mongod.getUri();
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10,
  };
  await mongoose.connect(uri, mongooseOpts);
}

module.exports.disconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
}

module.exports.clear = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
}
// let mongod = null;

// const connectDB = async () => {
//   try {
//     let dbURL = 'mongodb://username:password@cluster0.9cvn2fk.mongodb.net/';
//     if (process.env.NODE_ENV === 'test') {
//       mongod = await MongoMemoryServer.create();
//       dbURL = mongod.getUri();
//     }

//     const conn = await mongoose.connection(dbURL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//     })
//   } catch (err) {
//     console.log(err);
//     process.exit(1);
//   }
// };

// const disconnectDB = async () => {
//   try {
//     await mongoose.connection.close();
//     if (mongod) {
//       await mongod.stop();
//     }
//   } catch (err) {
//     console.log(err);
//     process.exit(1);
//   }
// };

// module.exports = { connectDB, disconnectDB };