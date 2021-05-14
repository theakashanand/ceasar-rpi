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
    try{
        flag = 1
        let serialData = JSON.parse(data)
        sensorData = serialData
        console.log(serialData.humidity,serialData.temperature, serialData.moisture)
    }
    catch{
        console.log("waiting: ", data)
    }

    if (flag){
        // db.query("INSERT INTO measurements (temperature,humidity) VALUES ($1, $2);", [temperature, humidity], (err, res)=>{
        //     if(err){
        //         console.log("error writing to db: ", err)
        //     }
        //     else{
        //         console.log("success writing to db: ", res)
        //     }
        // })
    }
}

function onError(){
    console.log("something went wrong in serial communication")
}

