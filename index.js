const express = require ("express")
const logger = require("morgan")
const bodyParser = require("body-parser")
const app = express()
const userRoutes= require('./app/api/routes/users')
const { default: mongoose } = require('mongoose')


app.use(logger('dev'))
app.use(bodyParser.json())
app.use('/user',userRoutes)
app.set('secretKey','qwertyui')

app.get('/',(req,res)=>{
    res.json({
        "APP":"JWT based api application",
        "message" : "Successfully run application"
    })
})

const mongoURI="mongodb+srv://prashant9860:prashant9860@cluster0.hc96rgp.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoURI)
.then(()=>{
    console.log("successfully connect to database");
})
.catch((err)=>{
    console.log(err);
})

app.listen(5000,()=> {
console.log("successfully running on the PORT :5000");
})