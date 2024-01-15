const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const todoSchema = require('../schemas/todoSchema');


//Making an Object data model or Object data mapping by using 'todoSchema'.
const Todo = new mongoose.model('Todo',todoSchema); 

//GET all the todos
router.get('/',async (req,res)=>{
    try{
        const data = await Todo.find({status:'active'})
        .select({ //hiding
            _id:0, 
            __v:0,
            date:0,
            status:0,
        })
        .limit(2)
        .exec()
        res.status(200).send({result:data})
     
    }
    catch(error){
        console.error(error)
        res.status(500).send({error:'Server side error'})
    }

});

//GET a todo by ID 
router.get('/:id',async (req,res)=>{
    try{
        const data = await Todo.find({_id:req.params.id})
        .select({  
            _id:0, 
            __v:0,
            status:0,
        })
        .exec()
        res.status(200).send({result:data})
     
    }
    catch(error){
        console.error(error)
        res.status(500).send({error:'Server side error'})
    }
});



//POST todo
router.post('/',async (req,res)=>{
    try{
        const newTodo = new Todo(req.body); 
        await newTodo.save();
        res.status(200).json({message:'Todo save succesfully'})
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:'Server side error'})
    }
    
});
//POST multiple todo
router.post('/all',async (req,res)=>{ 
    try{
        await Todo.insertMany(req.body);
        res.status(200).json({message:'Todos were add succesfully'})
    }
    catch(error){
        console.error(error)
        res.status(500).json({error:'Server side error'})
    }
    
});



//PUT todo
router.put('/:id',async (req,res)=>{
    try{
        const result = await Todo.findByIdAndUpdate(
            {
                _id:req.params.id  //first parameter
            },
            {
                $set:{status:'inactive'} //second parameter 
            },
            {
                new:true //third parameter[optional] (console e updated database dekhate)
            }
 
        );
        res.status(200).json({message:'Updated succesfully'})
        console.log(result)
    }

    catch(error){
        console.error(error);
        res.status(500).json({error:'Server side error'})
    }

});

//DELETE todo
router.delete('/:id',async (req,res)=>{
    try{
        await Todo.deleteOne({_id:req.params.id})
        res.status(200).json({message:'Succesfully deleted'})
    }
    catch(error){
        console.error(error)
        res.status(500).json({error:'Failed to delete'})
    }
    

});

module.exports = router; 