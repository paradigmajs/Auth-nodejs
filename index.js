const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', require('./routes/index'))
app.use((req,res)=> {
    res.status(404).send({url:req.originalUrl+ ' Not found'})
})
const start = async()=>{
    try {
        await mongoose.connect(
            'mongodb+srv://Admin:Qwerty!23@cluster0.xd19r.mongodb.net/new-auth',
            {
                useNewUrlParser:true, 
                useUnifiedTopology: true
            }
        )
        console.log('Connect db success');
        app.listen(5050)
    } catch (error) {
        console.log(error);
    }
}

start()