const express = require("express");
require("dotenv").config()
const cors = require("cors");
const { connectDB } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { storyRouter } = require("./routes/story.route");


const app = express()
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.json("hi")
})
app.use("/users",userRouter)
app.use("/story",storyRouter)
 
connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        try {
            console.log(`Server running at port ${process.env.PORT}`);
        } catch (error) {
            console.log(error);
            console.log("Something went wrong");
        }
    })
})
