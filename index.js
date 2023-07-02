const express=require('express');
const mongoose=require('mongoose');
const authRouter=require("../back-end/routes/auth");
const hotelRouter=require("../back-end/routes/hotels");
const roomRouter=require("../back-end/routes/room");
const userRouter=require("../back-end/routes/user");
const CookieParser=require("cookie-parser");
const dotenv=require("dotenv")
const app=express();

mongoose.connect("mongodb+srv://mighty:qwertyuiop@cluster0.ngqidrs.mongodb.net/Booking?retryWrites=true&w=majority")
.then(function(){console.log("is connected")}).catch(function(err){
    console.log(err)
})


app.use(CookieParser());
app.use(express.json());
dotenv.config()

//middlewares
app.use("/auth",authRouter);
app.use("/hotel",hotelRouter);
app.use("/room",roomRouter);
app.use("/user",userRouter)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });



app.listen(5500,function(){
    console.log("successfully running!")
})