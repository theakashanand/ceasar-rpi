const Gpio = require('onoff').Gpio;

const pump = new Gpio(18, 'out');

console.log("Starting Pump")
pump.writeSync(1)
setTimeout(()=>{
    pump.writeSync(0)
}, 5000)
