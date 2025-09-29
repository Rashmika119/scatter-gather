import express from 'express';
import logisticRoute from './controller.js';
const app=express();
const port=5000;

app.use(express.json())
app.use("/logistic",logisticRoute);

app.listen(port,()=>{
    console.log("logistic service is running on http://localhost:5000");
})