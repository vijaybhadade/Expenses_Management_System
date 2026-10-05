const { registerUserService,loginUserService } = require("../services/userService");



//Register controller

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        await registerUserService({ name, email, password });

        res.status(201).json({
            success: true,
            message: "New user Register succussfully..",
            User:{
                name:name,
                email:email,
                
            }
        });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message || "internal server error"
        });
    }
};



//login controller 

const loginUser=async(req,res)=>{
    const{email,password}=req.body;
    try{
   const token= await loginUserService({email,password});
    res.status(200).json({
        success:true,
        message:"Login successful",
        token:token
    })

    }catch(error)
    {
        const statusCode=error.statusCode || 500;
        res.status(statusCode).json({
            success:false,
            message:error.message || "internal server error",
        });
    }
}

module.exports = { registerUser,loginUser };