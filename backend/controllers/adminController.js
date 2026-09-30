import User from '../models/User.js';
import Service from '../models/Service.js';
import Booking from '../models/Booking.js';
export async function dashboard(req, res, next) { try { const [users, services, bookings, pending] = await Promise.all([User.countDocuments(), Service.countDocuments(), Booking.countDocuments(), Booking.countDocuments({ status: 'pending' })]); res.json({ stats: { users, services, bookings, pending } }); } catch (error) { next(error); } }
