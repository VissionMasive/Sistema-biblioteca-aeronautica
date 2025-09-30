const express= require ("express")
const router = express.Router()
const db = require("../db")

router.get("/",async (req,res,next)=>{
    try{
        const limit = parseInt(req.query.limit)||100
        const {rows}= await db.query("SELECT nombre, descripcion, id FROM public.libros ORDER BY id LIMIT $1",[limit])
        res.json(rows)
    } catch (err) {next(err)}
})
router.post("/",async (req,res,next)=>{
    try{
        const{rows}= await db.query("INSERT INTO public.libros (nombre, descripcion) values ($1,$2)",[req.body.nombre,req.body.descripcion])
        res.status(201)
    } catch(err) {next(err)}
})
module.exports = router