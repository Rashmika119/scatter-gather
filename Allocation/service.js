

export const getAllocationInfo=(req,res)=>{
    console.log("123")
    try{
    const companyName=req.params.name;

    if(!companyName){
        return res.status(400).json({message:"Company name is required"})
    }
    const time=Date.now();
    const duration=Math.floor(Math.random()*(100-10+1))+10;
    if(!time || !duration){
        return res.status(404).json({message:"No such company found"})
    }
    return res
    .status(200)
    .json({
        company:companyName,
        time:time,
        duration:duration,
    });
}catch(error){
    console.error("Error of getting data"+error);
    return res.status(500).json({message:"Internal server error"});
}
};