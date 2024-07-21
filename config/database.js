const mongoose = require('mongoose')

function dbconnection(){
    mongoose.connect(process.env.DB_Connection).then((conn)=>{
        console.log(`Database Connceted :${conn.connection.host}`)
    })
    .catch((err)=>{
        console.error(`Database Error:$(err)`)
        process.exit(1)
    })
}
module.exports = dbconnection ;