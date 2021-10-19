const route = require("express").Router()
const bcrypt =require("bcrypt")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const { findOne } = require("../models/User")

// update
route.put("/:id",async(req,res)=>{
    if(req.body.userId === req.params.id){
    try {
        if(req.body.password){
            const salt =await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password,salt)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).send(updatedUser)
        
    } catch (error) {
        res.status(500).send(error)
        
    }
    }
    else{return res.status(403).send("you can not update this blog")}
})
// delete
route.delete("/:username",async(req,res)=>{
    if(req.body.username === req.params.username){
    try {
   await User.findByIdAndDelete(req.params.id)
        res.status(200).send("acount deleted successfully")
        
    } catch (error) {
        res.status(500).send(error)
        
    }
    }
    else{return res.status(403).send("you can not delete this blog")}
})
// get user
route.get("/:id",async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        const {password,...others} = user._doc
        res.status(200).send(others) 
    } catch (error) {
        res.status(500).send(error)
        
    }
})
module.exports = route
