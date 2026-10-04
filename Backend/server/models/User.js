const emailValidatin = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name must be required!"]
    },
    email: {
        type: String,
        trim: true,
        required: [true, "email must be required!"],
        unique: true,
        match: [emailValidatin, "Please enter a valid email address!"]
    },
    password: {
        type: String,
        required: [true, "Password must be required!"],
        minLength: [8, "Password minimum length is 8 !"]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = { User };