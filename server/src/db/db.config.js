import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected Successfully");
  } catch (error) {
    console.log("Failed to connect to the DataBase");
    process.exit(1);
  }
};

export default connectDB;
