const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    assert.strictEqual(err, null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);


    //DROPPING COLLECTION 
    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection', result);

        const collection = db.collection('campsites');



        //INSERTING DOCUMENT
        collection.insertOne({ name: "Breadcrumb Trail Campground", description: "Test" },
            (err, result) => {
                assert.strictEqual(err, null);
                console.log('Insert Document:', result.ops);


                //LOGGING DOCUMENT THAT WAS INSERTED
                collection.find().toArray((err, docs) => {
                    assert.strictEqual(err, null);
                    console.log('Found Documents:', docs);

                    client.close();
                });
            });
    });
});