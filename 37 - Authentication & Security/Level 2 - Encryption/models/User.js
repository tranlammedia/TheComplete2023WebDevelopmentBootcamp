import mongoose from "mongoose";
import encrypt from "mongoose-encryption";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.SOME_LONG_UNGUESSABLE_STRING;

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

userSchema.plugin(encrypt, {
    secret: secret,
    encryptedFields: ['password'],
    decryptPostSave: false,
});

const User = new mongoose.model("user", userSchema);

export { User };
