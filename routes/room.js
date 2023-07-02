const router=require('express').Router();
const Room=require("../models/Room");
const Hotel=require("../models/Hotel");

//CREATE ROOM
router.post("/:hotelid",async  function(req,res,next){
    const hotelId=req.params.hotelid
    const newRoom=new Room(req.body)
    try{
        const savedRoom= newRoom.save()
        try{
            await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms:savedRoom._id},})
            res.status(200).json(newRoom)
        }catch(err){
            next(err)
        }
    }catch(err){
        next(err)
    }

});

//UPDATE
router.put("/:id", async function(req,res){
    try{
        const updateRoom=await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(201).json(updateRoom)
    }catch(err){
        next(err)
    }
})
//DELETE
router.delete("/:id", async function(req,res,next){
    try{
        await Room.findByIdAndDelete(req.params.id)
        res.status(201).json("Sucessfully deleted")
    }catch(err){
        next(err)
    }
})
//GET
router.get("/:id", async function(req,res,next){
    try{
        const room=await Room.findById(req.params.id)
        res.status(201).json(room)
    }catch(err){
        next(err)
    }
})
//GETALL
router.get("/", async function(req,res,next){
    try{
        const AllRoom=await Room.find()
        res.status(200).json(AllRoom)
    }catch(err){
        next(err)
    }
})


module.exports=router