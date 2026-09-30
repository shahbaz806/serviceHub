import User from '../models/User.js';
import Service from '../models/Service.js';
import Booking from '../models/Booking.js';
export async function dashboard(req, res, next) {
  try {
    const [users, providers, services, bookings, pending, completed, revenue] = await Promise.all([
      User.countDocuments({ role: 'user' }), User.countDocuments({ role: 'provider' }), Service.countDocuments(), Booking.countDocuments(),
      Booking.countDocuments({ status: 'pending' }), Booking.countDocuments({ status: 'completed' }),
      Booking.aggregate([{ $match: { status: { $in: ['confirmed', 'in_progress', 'completed'] } } }, { $group: { _id: null, total: { $sum: '$price' } } }])
    ]);
    res.json({ stats: { users, providers, services, bookings, pending, completed, revenue: revenue[0]?.total || 0 } });
  } catch (error) { next(error); }
}
export async function listUsers(req, res, next) {
  try { const { role = '' } = req.query; const query = role ? { role } : {}; res.json({ users: await User.find(query).select('name email role phone profileImage providerProfile createdAt').sort({ createdAt: -1 }) }); } catch (error) { next(error); }
}
export async function updateUserRole(req, res, next) {
  try {
    const { role } = req.body;
    if (!['user', 'provider', 'admin'].includes(role)) return res.status(400).json({ message: 'Invalid role.' });
    if (req.params.id === String(req.user._id) && role !== 'admin') return res.status(400).json({ message: 'You cannot remove your own admin access.' });
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true, runValidators: true }).select('name email role phone profileImage providerProfile createdAt');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json({ user, message: 'User role updated.' });
  } catch (error) { next(error); }
}
