const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors')
const PORT = process.env.PORT || 8001;


mongoose.connect('mongodb://127.0.0.1:27017/atmowork')
.then(res => console.log('MongoDB Connected!'))
.catch(err => console.log('MongoDB Connection Failed' , err))

app.use("/public",express.static(path.join(__dirname , 'public')))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : true }))


app.get('/' , (req , res)=>{
    res.send('Working')
})

app.listen(PORT , ()=> console.log(`Listening on http://localhost:${PORT}`))
