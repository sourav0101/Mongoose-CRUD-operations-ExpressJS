const express = require('express')
const app = express()
const mongoose = require('mongoose')

const todoHandler = require('./routeHandler/todoHandler')

app.use(express.json())

/* Database connection with mongoose */  
mongoose
  .connect('mongodb://127.0.0.1:27017/todos')  //it will return a promise 
  .then(()=>{console.log('connection succesfully')})
  .catch((err)=>console.log(err))

//Application route
app.use('/todo',todoHandler)



//default error handler 
const errorHandler = (err, req, res, next) =>{
  if(res.headersSent){
    return next(err) 
  }
  res.status(500).json({error:err})
}

app.listen(3000,()=>{
  console.log('app listing at port 3000...')
})