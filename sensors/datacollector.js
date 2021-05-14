var sensor = require("node-dht-sensor");
var db = require('../config/database');

sensor.initialize(22,12)
// sensor.read(22, 12, function(err, temperature, humidity) {
//     if (!err) {
//       console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
//     }
//   });
  
var interval = setInterval(function(){
    writeToDb();
},3000)

function writeToDb(){
    var readout = sensor.read();
    var temperature = readout.temperature.toFixed(2)
    var humidity = readout.humidity.toFixed(2)

    // db.query("INSERT INTO measurements (temperature,humidity) VALUES ($1, $2);", [temperature, humidity], (err, res)=>{
    //     if(err){
    //         console.log("error writing to db: ", err)
    //     }
    //     else{
    //         console.log("success writing to db: ", res)
    //     }
    // })
}

const sensorModule = {
    getTemp: () =>{
        var readout = sensor.read();
        return readout.temperature.toFixed(2) 
    },

    getHumidity: ()=>{
        var readout = sensor.read();
        return readout.humidity.toFixed(2)
    },

    getAllData: () =>{
        var readout = sensor.read();
        return {
            temperature: readout.temperature.toFixed(2) ,
            humidity: readout.humidity.toFixed(2)
        }

    }
}

module.exports = sensorModule