const express = require('express')
const compression = require('compression')
const path = require('path')
const bodyParser = require('body-parser')
const serveIndex = require('serve-index')
const opn = require('opn')

const PORT = 9000
const app = express()

app.use(compression())

app.use(express.static(path.join(__dirname, 'public')))

const ignores = ['data', 'js', '00.html']
app.use('/', serveIndex(path.join(__dirname, 'public'), {
  icons: true,
  filter(filename, index, files, dir) {
    return !ignores.includes(filename)
  }
}))

app.use(bodyParser.json({ limit: '5000kb' }))
app.use(bodyParser.raw({ limit: '5000kb' }))
app.use(bodyParser.urlencoded({ extended: false, limit: '5000kb' }))
app.use(bodyParser.text({ type: 'text/xml' }))


app.listen(PORT, function(err) {
  if (err) {
    throw err
  }
  console.log(`Listening at http://localhost:${PORT}/`) // eslint-disable-line

  opn(`http://localhost:${PORT}/`)
})