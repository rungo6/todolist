const express = require('express')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const methOverride = require('method-override')
const routes = require('./routes')
const session = require('express-session')


require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: true }))
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(methOverride('_method'))
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(routes)


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})