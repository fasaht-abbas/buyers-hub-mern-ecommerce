import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `the database is connected with ${conn.connection.host}`.bgYellow.blue
    );
  } catch (error) {
    console.log(`error in the mongo db ${error}`.bgRed.blue);
  }
};

export default connectDB;
