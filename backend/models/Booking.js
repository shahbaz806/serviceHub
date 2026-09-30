import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    date: { type: String, required: true },
    time: { type: String, required: true },
    customerName: { type: String, required: true, trim: true, maxlength: 80 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    address: { type: String, required: true, trim: true, maxlength: 300 },
    instructions: { type: String, trim: true, maxlength: 1000, default: "" },
    price: { type: Number, required: true, min: 0 },
    bookingNumber: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "in_progress", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

bookingSchema.index({ serviceId: 1, date: 1, time: 1, status: 1 });

export default mongoose.model("Booking", bookingSchema);
