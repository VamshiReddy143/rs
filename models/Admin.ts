// models/Admin.ts
import mongoose, { Schema, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';

const AdminSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin'], default: 'admin', required: true },
  createdAt: { type: Date, default: Date.now },
});

// Hash password before saving
AdminSchema.pre('save', async function (next) {
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Compare password method
AdminSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Export model, ensuring it’s only created once
const Admin = models.Admin || model('Admin', AdminSchema);

export default Admin;