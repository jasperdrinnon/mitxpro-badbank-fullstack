const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
  console.log("Connected successfully to server");
    // database Name
    const dbName = 'jellyfish';
    const db = client.db(dbName);

    // new user
    const name = 'user' + Math.floor(Math.random()*10000);
    const email = name + '@gmail.com';

    // insert into customer table
    const collection = db.collection('users');
    const doc = {name, email};
    collection.insertOne(doc, {w:1}, function(err, result) {
        console.log('Document insert');
    });

    const users = db
        .collection('users')
        .find({})
        .toArray(function(err, docs) {
            console.log('Collection:',docs);
            client.close();            
        });    
});
