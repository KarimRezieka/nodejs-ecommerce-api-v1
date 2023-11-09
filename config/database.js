const mongoose = require('mongoose')

function dbconnection(){
    mongoose.connect(process.env.DB_Connection).then((conn)=>{
        console.log(`Database Connceted :${conn.connection.host}`)
    })
}
module.exports = dbconnection ;