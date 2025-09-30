import express from "express";
import appRoute from  "./controller.js";
const app=express();
const port=4000;

app.use(express.json());
app.use("/app",appRoute);

app.listen(port,()=>{
    console.log("App service is running on http://localhost:4000");
})


