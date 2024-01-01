import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const User = new mongoose.model("user", userSchema);

export { User };
