const bcrypt = require('bcryptjs');
const { connectDB, getDB } = require('../db');

let db;
connectDB((err) => {
    if (!err) {
        db = getDB();
        console.log('Database connected successfully');
    }
})

class AuthService {
    async registerUser(user) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        return db.collection('users').insertOne(user);;
    }

    async LoginUser(email, password) {
        const user = await db.collection('users').findOne({ email });
        if (!user){
            return null;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        return isMatch ? user : null;
    }
}

module.exports = AuthService;