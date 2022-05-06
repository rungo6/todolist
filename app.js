const express = require('express')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const methOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(methOverride('_method'))

app.use(routes)


app.listen(3000, () => {
  console.log('app is running on port 3000.')
})