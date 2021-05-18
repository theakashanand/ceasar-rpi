var serialPort = require('serialport')
var db = require('../config/database');

var port = new serialPort('/dev/ttyACM0', {
    baudRate:9600
})

const Readline = serialPort.parsers.Readline;
const parser = new Readline();
port.pipe(parser)

port.on('open', onPortOpen)
parser.on('data', onData)
port.on('close', onClose)
port.on('error', onError)
port.write("Hi there!")

function onPortOpen(){
    console.log("port open")
}

function onClose(){
    console.log("port closed")
}

var sensorData = {}

function onData(data){
    let flag = 0
    let temperature, humidity, moisture, co2
    try{
        flag = 1
        let serialData = JSON.parse(data)
        sensorData = serialData
        console.log(serialData.humidity,serialData.temperature, serialData.moisture)
        temperature = serialData.temperature
        humidity = serialData.humidity
        moisture = serialData.moisture
        co2 = serialData.co2

    }
    catch{
        console.log("waiting: ", data)
    }

    if (flag){
        db.query("INSERT INTO sensordata (temperature,humidity, moisture, co2) VALUES ($1, $2, $3, $4);", [temperature, humidity, moisture, co2], (err, res)=>{
            if(err){
                console.log("error writing to db: ", err)
            }
            else{
                console.log("success writing to db: ", res)
            }
        })
    }
}

function onError(){
    console.log("something went wrong in serial communication")
}

sensorModule = {
    getLatestData:()=>{
        return sensorData;
    }, 
    getAllTimeData: (field)=>{
        console.log("field: ", field)
        db.query("SELECT $1, timestamp FROM measurements; ",[field], (error, results)=>{
            if(error) {
                console.log(error);
            }
            else{
                return results.rows
            }
        })

    },
}

module.exports = sensorModule
