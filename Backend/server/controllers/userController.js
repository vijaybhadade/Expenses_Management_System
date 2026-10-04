const { registerUserService } = require("../services/userService");

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        await registerUserService({ name, email, password });

        res.status(201).json({
            success: true,
            message: "New user Register succussfully..",
            User:{
                name:name,
                email:email
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

module.exports = { registerUser };