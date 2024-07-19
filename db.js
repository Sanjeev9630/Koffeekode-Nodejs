const { Pool } = require('pg')

const client = new Pool({
    host : process.env.HOST ,
    port : process.env.DBPORT ,
    database : process.env.DATABASE ,
    user : process.env.USER ,
    password : process.env.PASSWORD ,
})

client.connect((err) => {
    if(err) console.log("Error while connecting Postgre", err)
    else console.log("Database connected Successfully")    
})

module.exports = client 