const express = require("express")
const mongoose = require("mongoose")
const UserAuthRoute = require("./routes/Auth")
const PostRoute = require("./routes/posts")
require('dotenv').config()
const UserRoute = require("./routes/users")

const app = express()
app.use(express.json());
app.use("/api/auth",UserAuthRoute)
app.use("/api/user",UserRoute)
app.use("/api/post",PostRoute)


// variable
const port = process.env.PORT
const db = process.env.DB;

mongoose.connect(db).then(()=>{console.log("the server is connected to the db")}).catch(err=>console.log(err))

// mddleware

app.listen(port,()=>{console.log("server up and running")})