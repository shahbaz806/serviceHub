import Booking from '../models/Booking.js';
import Service from '../models/Service.js';

const populated = [{ path: 'serviceId', populate: { path: 'providerId', select: 'name profileImage phone' } }, { path: 'userId', select: 'name email phone' }];
export async function createBooking(req, res, next) {
  try {
    const { serviceId, date, time, address, customerName, phone, instructions = '' } = req.body;
    if (!serviceId || !date || !time || !address || !customerName || !phone) return res.status(400).json({ message: 'Service, date, time, name, phone and address are required.' });
    if (new Date(`${date}T00:00:00`) < new Date(new Date().toDateString())) return res.status(400).json({ message: 'Please select a future date.' });
    const service = await Service.findOne({ _id: serviceId, isActive: true });
    if (!service) return res.status(404).json({ message: 'Service not found or currently unavailable.' });
    if (!service.availableSlots.includes(time)) return res.status(400).json({ message: 'That time slot is unavailable for this service.' });
    const existing = await Booking.exists({ serviceId, date, time, status: { $in: ['pending', 'confirmed', 'in_progress'] } });
    if (existing) return res.status(409).json({ message: 'That time slot has just been booked. Please choose another.' });
    const bookingNumber = `SH-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const booking = await Booking.create({ userId: req.user._id, serviceId, date, time, address, customerName, phone, instructions, price: service.price, bookingNumber });
    await booking.populate(populated);
    res.status(201).json({ booking, message: 'Booking request received.' });
  } catch (error) { next(error); }
}
export async function myBookings(req, res, next) { try { const bookings = await Booking.find({ userId: req.user._id }).populate({ path: 'serviceId', populate: { path: 'providerId', select: 'name profileImage' } }).sort({ createdAt: -1 }); res.json({ bookings }); } catch (error) { next(error); } }
export async function allBookings(req, res, next) { try { const bookings = await Booking.find().populate(populated).sort({ createdAt: -1 }); res.json({ bookings }); } catch (error) { next(error); } }
export async function changeStatus(req, res, next) { try { const { status } = req.body; if (!['pending','confirmed','in_progress','completed','cancelled'].includes(status)) return res.status(400).json({ message: 'Invalid status.' }); const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate(populated); if (!booking) return res.status(404).json({ message: 'Booking not found.' }); res.json({ booking, message: 'Booking status updated.' }); } catch (error) { next(error); } }
export async function cancelBooking(req, res, next) { try { const booking = await Booking.findOne({ _id: req.params.id, userId: req.user._id }); if (!booking) return res.status(404).json({ message: 'Booking not found.' }); if (['completed','cancelled'].includes(booking.status)) return res.status(400).json({ message: `This booking cannot be cancelled.` }); booking.status = 'cancelled'; await booking.save(); res.json({ booking, message: 'Booking cancelled.' }); } catch (error) { next(error); } }
