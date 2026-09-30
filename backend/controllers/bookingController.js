import Booking from '../models/Booking.js';
import Service from '../models/Service.js';

const populated = [{ path: 'serviceId' }, { path: 'userId', select: 'name email' }];
export async function createBooking(req, res, next) {
  try {
    const { serviceId, date, time, address } = req.body;
    if (!serviceId || !date || !time || !address) return res.status(400).json({ message: 'Service, date, time and address are required.' });
    if (new Date(`${date}T00:00:00`) < new Date(new Date().toDateString())) return res.status(400).json({ message: 'Please select a future date.' });
    if (!(await Service.exists({ _id: serviceId }))) return res.status(404).json({ message: 'Service not found.' });
    const booking = await Booking.create({ userId: req.user._id, serviceId, date, time, address });
    await booking.populate(populated);
    res.status(201).json({ booking, message: 'Booking request received.' });
  } catch (error) { next(error); }
}
export async function myBookings(req, res, next) { try { const bookings = await Booking.find({ userId: req.user._id }).populate('serviceId').sort({ createdAt: -1 }); res.json({ bookings }); } catch (error) { next(error); } }
export async function allBookings(req, res, next) { try { const bookings = await Booking.find().populate(populated).sort({ createdAt: -1 }); res.json({ bookings }); } catch (error) { next(error); } }
export async function changeStatus(req, res, next) { try { const { status } = req.body; if (!['pending','confirmed','completed','cancelled'].includes(status)) return res.status(400).json({ message: 'Invalid status.' }); const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate(populated); if (!booking) return res.status(404).json({ message: 'Booking not found.' }); res.json({ booking, message: 'Booking status updated.' }); } catch (error) { next(error); } }
export async function cancelBooking(req, res, next) { try { const booking = await Booking.findOne({ _id: req.params.id, userId: req.user._id }); if (!booking) return res.status(404).json({ message: 'Booking not found.' }); if (['completed','cancelled'].includes(booking.status)) return res.status(400).json({ message: `This booking cannot be cancelled.` }); booking.status = 'cancelled'; await booking.save(); res.json({ booking, message: 'Booking cancelled.' }); } catch (error) { next(error); } }
