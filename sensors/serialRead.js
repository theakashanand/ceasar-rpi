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

function onData(data){
    try{
        let serialData = JSON.parse(data)
        console.log(serialData.humidity,serialData.temperature, serialData.moisture)
    }
    catch{
        console.log("waiting: ", data)
    }
}

function onError(){
    console.log("something went wrong in serial communication")
}

