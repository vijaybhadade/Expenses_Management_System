

const errorHandle=(err,req,res,next)=>{

    if(err.name==="CastError")
    {
     return res.status(err.statusCode||400).json({
        success:false,
        message:err.message || "mongodb error!"
     });
    }

    if(err)
    {
        return res.status(err.statusCode || 500).json({
            success:false,
            message:err.message || "Internal server error"
        });
    }

    
    next(err);
}

module.exports={errorHandle};