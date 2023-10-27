const express =require('express')
const dotenv = require('dotenv')
dotenv.config({path:'.env'});

const app = express()

app.get('/',(req,res)=>{
    res.send("our api v3")
});

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`app running ${PORT}`)
})