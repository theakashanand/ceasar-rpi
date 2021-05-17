const express = require('express')
const sensorModule = require('./sensors/serialRead')
const path  = require('path')
var db = require('./config/database');


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

app.get('/alltime-data/:field', function(req, res) {
  console.log("alltime data request")
  // res.send("field is set to " + req.params.field);
  // res.json({field: req.params.field});
  let field = req.params.field
  console.log("field: ", field)
  db.query(`SELECT ${field} AS y, timestamp AS label FROM measurements; `, (error, results)=>{
    if(error) {
        console.log(error);
    }
    else{
        res.json(results.rows)
    }
  })
});


app.listen(port, () => {
  console.log(`Habitat is up and running at http://localhost:${port}`)
})