const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const port = 5080;

const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
)

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

// Fetching User Data
app.get('/users', (req,res) => {
  knex('users')
    .then(data=>{
      res.status(200).send(data);
  })
  .catch((err)=>{
    res.status(300).send('Error getting users')
  });
});

app.get('/users/:id', (req, res) => {
  try {
    const { id } = req.params;
    knex('users').where({ id: id })
      .then(data => {
        res.status(200).send(data)
      })
  } catch (err) {
    console.log(err);
    res.status(301).send('error retreving user ids')
  }
})

//Fetch item data
app.get('/item', (req,res) => {
  knex('item')
    .then(data=>{
      res.status(200).send(data);
  })
  .catch((err)=>{
    res.status(300).send('Error getting item')
  });
});

app.post('/newitem', async (req, res) => {
  try {
    const { id, userId, itemName, description, quantity } = req.body
    if (!id || !userId || !itemName || !description || !quantity) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newItem = await knex('items')
    .insert({
      id,
      userId,
      itemName,
      description,
      quantity,
    })
  res.status(201).json({ message: 'Item Added', item: newItem })
  } catch (err) {
    console.log(err);
    res.status(301).send('error adding item')
  }
})

app.listen(port, () => {
  console.log("App listening on port:", port);
});