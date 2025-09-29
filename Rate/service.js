
import express from 'express';
  

export const getRateInfo=async(req,res)=>{
    const companyName=req.params.name;
    if(!companyName){
        return res.status(400).json({message:"company name is required for rate service"})   
    }
    const time=Date.now();
    const value=Math.floor(Math.random()*(10000-1000+1))+1000;
    if(!time || !value){
        return res.status(404).json({message:"No such company found"})
    }
    return res
    .status(200)
    .json({
        companyName:companyName,
        time:time,
        value:value
    })
}