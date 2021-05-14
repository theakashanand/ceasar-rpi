const express = require('express')
const sensorModule = require('./sensors/datacollector')
const path  = require('path')
var favicon = require('serve-favicon');

const app = express()
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, "public")));

const port = 8000
require('dotenv').config({ path: __dirname + '/.env' })

app.get('/', (req, res) => {
  res.render('index', { title: 'Ceasar', message: 'Welcome to Ceasar', sensorData: sensorModule.getAllData() })
})

app.get('/temperature', (req, res) => {
  res.send(`Temperature: ${sensorModule.getTemp()} degrees Celsius`)
})

app.get('/humidity', (req, res) => {
  res.send(`Humidity: ${sensorModule.getHumidity()} %`)
})

app.listen(port, () => {
  console.log(`Habitat is up and running at http://localhost:${port}`)
})