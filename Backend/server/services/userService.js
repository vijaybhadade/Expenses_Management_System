const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const normalization = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



//Register service

const registerUserService = async ({ name, email, password }) => {
  if (!name || name.length < 3) {
    const error = new Error("Please enter name and charecter at list 3 ");
    error.statusCode = 400;
    throw error;
  }
  if (!email || !normalization.test(email)) {
    const error = new Error("Please enter a valide email and unique!");
    error.statusCode = 400;
    throw error;
  }
  if (!password || password.length < 8) {
    const error = new Error(
      "Please enter password or password length must be 8 charecter!",
    );
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findOne({ email });

  if (user) {
    const error = new Error("User already exists", 409);
    error.statusCode = 409;
    throw error;
  }

  //hash password
  const hashPassoword = await bcrypt.hash(password, 12);

  //create new user

  const newUser = new User({
    name: name,
    email: email,
    password: hashPassoword,
  });
  return await newUser.save();
};


//loginService

const loginUserService=async({email,password})=>{

  if(!email || !normalization.test(email))
  {
    const error = new Error("Please enter a valid emailId!");
    error.statusCode = 400;
    throw error;
  }
  if(!password || password.length < 8)
  {
    const error= new Error("Please enter password or password length must be 8 charecter!");
    error.statusCode=400;
    throw error;
  }

  const user= await User.findOne({email});
  if(!user)
  {
    const error= new Error("Invalid emai or  password!");
    error.statusCode=401;
    throw error;
  }

  const result= await bcrypt.compare(password,user.password);
  if(!result)
  {
    const error= new Error("Invalid email or password!");
    error.statusCode=401;
    throw error;
  }
  return   result;
}

module.exports = { registerUserService,loginUserService };
