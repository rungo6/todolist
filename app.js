const express = require('express')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const methOverride = require('method-override')
const routes = require('./routes')
const session = require('express-session')
const usePassport = require('./config/passport');
const res = require('express/lib/response');

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

usePassport(app)

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated
  res.locals.user = req.user
  next()
})

app.use(routes)


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})