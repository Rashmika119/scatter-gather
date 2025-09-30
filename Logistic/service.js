import express from 'express'; 

export const getLogisticInfo=async(req,res)=>{
    const companyName=req.params.name;
    if(!companyName){
        return res.status(400).json({message:"company name is required for logistic service"})   
    }

    const time=Date.now();
    const location=["newyork","london","paris"];

    if(!time || !location){
        return res.status(404).json({message:"No such company found"})
    }
    return res
    .status(200)
    .json({
        companyName:companyName,
        time:time,
        location:location
    })
}