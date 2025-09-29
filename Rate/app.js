import express from 'express';
import rateRoute from './Controller.js';
const app=express();
const port=6000;

app.use(express.json())
app.use("/rate",rateRoute);

app.listen(port,()=>{
    console.log("rate service is running on http://localhost:6000");
})