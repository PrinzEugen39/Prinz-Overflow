import mongoose from "mongoose";

let isConnected = false;

const DB =
  process.env.MONGODB_URL?.replace(
    "<password>",
    process.env.MONGODB_PASSWORD!
  ) || "";

console.log(DB);

export async function connectToDatabase() {
  mongoose.set("strictQuery", true);

  if (!DB)
    return console.log("Missing account information (wrong url or password)");

  if (isConnected) {
    console.log("MongoDB is already connected");
  }

  try {
    await mongoose.connect(DB, {
      dbName: "prinzflow",
    });

    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
}
