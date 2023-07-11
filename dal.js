const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let db = null;

//connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");

    //connect to myproject database
    db = client.db('jellyfish');
});

//create user account
function create(name, email, password){
    return new Promise((resolve, reject) => {
        const collection = db.collection("users");
        const doc = {name, email, password, balance:0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });
    });
}

//return all users
function all(){
    return new Promise((resolve,reject) => {
        const customer = db
            .collection("users")
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
            });
    });
}

function login(email, password) {
    return new Promise((resolve, reject) => {
        const authorizedUser = db
        .collection("users")
        .find({ email: email, password: password})
        .toArray(function(err, document) {
            console.log('array of logged in account document = ', document)
            err ? reject(err) : resolve(document)
            });
    });
}

// update balance
function depositOrWithdraw(email, amount){
    return new Promise((resolve, reject) => {    
        const customer = db
            .collection("users")            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}},
                { returnDocument: "after" },
                function (err, document) {
                    console.log('$' + amount + 'to balance for ' + email + document.value.balance + ' Open the Studio 3T app and look for database named ' + dbName +' then collection named ' + collectionName)
                    //err ? reject(err) : affected(document);
                    err ? reject(err) : resolve(document)
                }
            )       
    });    
}

module.exports = {create, all, login, depositOrWithdraw}