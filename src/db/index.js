import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("disconnected", () => {
      console.log("❌ MongoDB disconnected");
    });

    mongoose.connection.on("error", (error) => {
      console.error("⚠️ MongoDB connection error:", error);
    });

    await mongoose.connect(process.env.MONGO_URI);
    console.log("🤪 MongoDB connected");
  } catch (error) {
    console.error("🤩 MongoDB connection error", error);
    process.exit(1);
  }
};

export default connectDB;

