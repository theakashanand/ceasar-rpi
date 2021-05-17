const Gpio = require('onoff').Gpio;

const pump = new Gpio(18, 'out');

let timeout;

pump.writeSync(1)
setTimeout(() => pump.writeSync(0), 10000)
