const router=require('express').Router();
const mongoose=require("mongoose");
const Hotel =require("../models/Hotel");

//CREATE HOTEL
router.post("/", async function(req,res,next){
    const newHotel=new Hotel(req.body)
    try{
        const hotel=await newHotel.save()
        res.status(201).json(hotel)
    }catch(err){
        next(err)
    }
});
//UPDATE
router.put("/:id", async function(req,res){
    try{
        const updateHotel=await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(201).json(updateHotel)
    }catch(err){
        next(err)
    }
})
//DELETE
router.delete("/:id", async function(req,res,next){
    try{
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(201).json("Sucessfully deleted")
    }catch(err){
        next(err)
    }
})
//GET
router.get("/find/:id", async function(req,res,next){
    try{
        const hotel=await Hotel.findById(req.params.id)
        res.status(201).json(hotel)
    }catch(err){
        next(err)
    }
})
//GETALL
router.get("/", async function(req,res,next){
    try{
        const {min,max,...others}=req.query
        
        const AllHotel=await Hotel.find({...others,"cheapestPrice" : {$gt:min||1,$lt:max||999}});
        res.status(200).json(AllHotel)
    }catch(err){
        next(err)
    }
})


//COUNTBYCITY
router.get("/countByCity", async function(req,res,next){
    const cities=req.query.cities.split(",");
    try{
        const list=await Promise.all(cities.map(function(city){
            return Hotel.countDocuments({city:city})
        }))
        res.status(201).json(list)
    }catch(err){
        next(err)
    }
})


//COUNTBYTYPE
router.get("/countByType",async function(req,res){
    try{
    const hotelCount=await Hotel.countDocuments({type:"hotel"});
    const apartmentCount=await Hotel.countDocuments({type:"apartment"});
    const resortCount=await Hotel.countDocuments({type:"resort"});
    const villaCount=await Hotel.countDocuments({type:"villa"});
    const cabinCount=await Hotel.countDocuments({type:"cabin"});
    res.status(201).json(
        [
        {type:"hotel",count:hotelCount},
        {type:"apartment",count:apartmentCount},
        {type:"resort",count:resortCount},
        {type:"villa",count:villaCount},
        {type:"cabin",count:cabinCount}
        ]
    )
    }catch(err){
        res.status(401).json(err)
    }
})

module.exports=router