const Pool = require('pg').Pool;
const pool = new Pool({
    host: 'localhost',//process.env['DB_HOST'],
    port: '5432',//process.env['DB_PORT'],
    database: 'ceasardb',//process.env['DB_NAME'],
    user: 'postgres',//process.env['DB_USER'],
    password:'rasbpi' //process.env['DB_PASSWORD'],
    
})

console.log("USER: ", process.env['DB_USER'])

module.exports = pool;
