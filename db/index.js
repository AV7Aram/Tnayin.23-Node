const { MongoClient } = require("mongodb");

const URL = "mongodb://localhost:27017/usersDB";

let myDb
module.exports = {
    connectDB: async (cb) => {
        MongoClient.connect(URL)
            .then((client) => {
                myDb = client.db();
                cb();
            })
            .catch((err) => {
                console.error(err);
            });
    },
    getDB: () => myDb
}