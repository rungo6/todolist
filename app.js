const express = require('express')
const mongoose = require('mongoose')
const app = express()
const exphbs = require('express-handlebars');
const Todo = require('./models/todo')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected')
})

app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

app.listen(3000, () => {
  console.log('app is running on port 3000.')
})