const express = require('express')
const sensorModule = require('./sensors/serialRead')
const path  = require('path')


const app = express()
// app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, "public")));



const port = 8000
require('dotenv').config({ path: __dirname + '/.env' })

app.get('/', (req, res) => {
    res.render('index', { title: 'Ceasar', message: 'Welcome to Ceasar',time:Date.now(), sensorData: {temperature:60} })
})

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/latest-data", (req, res) =>{
  
  res.json({sensorData: sensorModule.getLatestData()});

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