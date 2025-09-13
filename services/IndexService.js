const { connectDB, getDB } = require('../db');
const { ObjectId } = require('mongodb');

let db;
connectDB((err) => {
    if (!err) {
        db = getDB();
        console.log('Database connected successfully');
    }
})

class IndexService {
    async getAllUsers() {
        
        return db.collection('users').find().toArray();
    }
    async getUsersCount() {
        return db.collection('users').find().count();
    }

    async getUserById(id) {
        return db.collection('users').findOne({ _id: new ObjectId(id) });
    }

    async deleteUser(id) {
        return db.collection('users').deleteOne({ _id: new ObjectId(id) });
    }

    async updateUser(id, data) {
        return db.collection('users').updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        );
    }
}

module.exports = IndexService;