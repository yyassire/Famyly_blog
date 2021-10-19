const route = require("express").Router()
const bcrypt =require("bcrypt")
const User = require("../models/User")
const jwt = require("jsonwebtoken")

// register
route.post("/register",async(req,res)=>{
 try {
    const salt = await bcrypt.genSalt(10)
    const hashPassword =await bcrypt.hash(req.body.password,salt)
   const newUser = new User({
       username:req.body.username,
       email:req.body.email,
       password:hashPassword
   })
   const savedUser = await newUser.save()
res.status(200).send(savedUser)
     
 } catch (error) {
     res.status(500).send(error)
     
 }
})
// login
route.post("/login",async(req,res)=>{
try {
    const user = await User.findOne({email:req.body.email})  
    if(!user){
        return res.status(404).send("user not find")
    }
    const verifyPassword  = await bcrypt.compare(req.body.password,user.password)
    if(!verifyPassword){
        return res.status(403).send("you entered the wrong password")
    }
    // ___create token
    // const createdToken =await jwt.sign({id:user._id,isAdmin:user.idAdmin,email:user.email},"yassire")
    const {password,...others} = user._doc
   res.status(200).json(others)
    
} catch (error) {
    res.status(500).send(error)
    
}
})

module.exports = route
