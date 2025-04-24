import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  googleId: string;
  name: string;
  email: string;
  image?: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);