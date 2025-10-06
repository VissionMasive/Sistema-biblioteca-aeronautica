const express= require ("express")
const router = express.Router()
const db = require("../db")
const { prestarLibro, devovlerLibro } = require("../servicios/libreria")

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
router.post("/:libroid/prestar/:userid",async(req,res)=>{
    const{libroid,userid}=req.params
    try{
        const result = await prestarLibro(userid,libroid)
        res.json(result)
    }catch(err){res.status(400).json({error:err.message})}
})
router.post("/:libroid/devolver/:userid",async(req,res)=>{
    const{libroid,userid}=req.params
    try{
        const result = await devovlerLibro(userid,libroid)
        res.json(result)
    }catch(err){res.status(400).json({error:err.message})}
})
module.exports = router