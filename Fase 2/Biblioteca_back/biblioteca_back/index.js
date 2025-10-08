const authRouter = require("./routes/auth")
const express= require("express")
const app= express()
const port = 3001
const cors = require("cors")
const booksrouter = require("./routes/books")
const categoryRouter = require("./routes/category")

app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("hola")
})
app.listen(port,()=>{
    console.log("listening")
})
app.use("/api/books",booksrouter)
app.use("/api/auth",authRouter)
app.use("/api/categories", categoryRouter)