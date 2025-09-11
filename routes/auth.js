var express = require('express');
const { connectDB, getDB } = require('../db');
const { registerSchema, loginSchema } = require('../schema/schema');
var router = express.Router();

let db;
connectDB((err) => {
  if (!err) {
    db = getDB();
  } else {
    console.log("Error connecting to database");
  }
});

router.get('/register', (req, res) => {
  res.render('register', { title: 'Registration', error: null });
});

router.post('/register', async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.render('register', { title: 'Registration', error: error.details[0].message });
  }
  await db.collection('users').insertOne(req.body);
  res.redirect('/auth/login');
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login', error: null });
});

router.post('/login', async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.render('login', { title: 'Login', error: error.details[0].message });
  }
  const user = await db.collection('users').findOne({ email: req.body.email, password: req.body.password });
  if (!user) {
    return res.render('login', { title: 'Login', error: 'Неверный email или пароль' });
  }
  res.redirect(`/${user._id}`);
});

module.exports = router;