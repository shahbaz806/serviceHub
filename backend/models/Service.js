import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, required: true, trim: true, maxlength: 2000 },
  category: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  image: { type: String, default: '' },
  rating: { type: Number, default: 4.8, min: 0, max: 5 }
}, { timestamps: { createdAt: true, updatedAt: false } });

export default mongoose.model('Service', serviceSchema);
