const mongoose = require("mongoose");

const database = async () => {
  try {
    const connectDatabase = await mongoose.connect(process.env.MONGODB_URL);
    console.log("database connected successfully");
    return connectDatabase;
  } catch (error) {
    console.error("Database connection failed....");
    throw error;
  }
};

module.exports = database;