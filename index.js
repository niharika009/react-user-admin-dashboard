const express = require('express');
const operations  = require('./operations');

const cors = require('cors'); //middle ware to handle cross origin request

const db = require('./databse')
const router = express.Router();
const app = express();
app.use(cors());

db(); // mongo connection is done here
app.use(express.json())

app.post('/api/newUser', (req, res) => {
  operations.createUser(req.body)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(error => {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    });
});

app.get('/api/getAllUsers',(req,res)=>{
    operations.getAllUsers().then((result)=>{
        res.send(result);
    });
});

app.listen(process.env.PORT);
