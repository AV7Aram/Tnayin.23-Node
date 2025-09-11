var express = require('express');
const { connectDB, getDB } = require('../db');
const { ObjectId } = require('mongodb');
var router = express.Router();

let db;
connectDB((err) => {
  if (!err) {
    db = getDB();
  } else {
    console.log("Error connecting to database");
  }
});

/* GET home page. */
router.get('/', async (req, res, next) => {
  let users = await db.collection('users').find().toArray()
  let count = await db.collection('users').find().count()
  res.render('index', { title: 'Users', users, count })
});

router.post('/add-user', async (req, res) => {
  await db.collection('users').insertOne(req.body);
  res.redirect('/');
});

router.get('/:id', async (req, res) => {
  const { id } = req.params
  if (!ObjectId.isValid(id)) {
    return res.status(400).render('error', { message: 'Invalid user ID', error: { status: 400, stack: '' } });
  }
  let user = await db.collection('users').findOne({ _id: new ObjectId(id) })
  res.render('user', { title: 'User Page', user })
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  await db.collection('users').deleteOne({ _id: new ObjectId(id) })
  res.json({ success: true })
});

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const body = req.body
  await db.collection('users').updateOne({ _id: new ObjectId(id) },
    { $set: { name: body.name, lastname: body.lastname, age: body.age, email: body.email, address: body.address } })
  res.json({ success: true })
});

router.get('/favicon.ico', (req, res) => res.status(204).end());

module.exports = router;