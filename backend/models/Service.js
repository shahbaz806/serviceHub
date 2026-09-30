import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, required: true, trim: true, maxlength: 2000 },
  category: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  duration: { type: Number, required: true, min: 15, default: 60 },
  image: { type: String, default: '' },
  rating: { type: Number, default: 4.8, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0, min: 0 },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  providerName: { type: String, trim: true, default: 'ServiceHub Pro' },
  location: { type: String, trim: true, default: 'Your local area' },
  availableSlots: { type: [String], default: ['09:00', '11:00', '14:00', '16:00'] },
  isActive: { type: Boolean, default: true }
}, { timestamps: { createdAt: true, updatedAt: false } });

export default mongoose.model('Service', serviceSchema);
