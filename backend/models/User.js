import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 60 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6, select: false },
  role: { type: String, enum: ['user', 'provider', 'admin'], default: 'user' },
  profileImage: { type: String, default: '' },
  phone: { type: String, trim: true, maxlength: 30, default: '' },
  providerProfile: {
    bio: { type: String, trim: true, maxlength: 600, default: '' },
    location: { type: String, trim: true, maxlength: 120, default: '' }
  }
}, { timestamps: { createdAt: true, updatedAt: false } });

export default mongoose.model('User', userSchema);
