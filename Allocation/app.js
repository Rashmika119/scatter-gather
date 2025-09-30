import express from "express";
import allocationRoute from "./controller.js";
const app=express();
const port=3000;

app.use(express.json());
app.use("/allocation",allocationRoute);

app.listen(port,()=>{
    console.log("Aloocation service is running on http://localhost:3000");
})


