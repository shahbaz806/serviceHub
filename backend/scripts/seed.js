import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Service from '../models/Service.js';
import Booking from '../models/Booking.js';

const services = [
  { title: 'Expert AC Repair & Tune-Up', category: 'AC Repair', price: 79, rating: 4.9, image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80', description: 'Keep your home cool and efficient with a full AC inspection, cleaning, and repair from a certified local technician.' },
  { title: 'Licensed Home Electrician', category: 'Electrician', price: 65, rating: 4.9, image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80', description: 'Safe, reliable electrical repairs for switches, outlets, lighting, breakers, and everyday home electrical issues.' },
  { title: 'Same-Day Plumbing Fix', category: 'Plumber', price: 59, rating: 4.8, image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=900&q=80', description: 'Fast help for leaks, clogged drains, fixtures, and plumbing problems with transparent pricing before work begins.' },
  { title: 'Deep Home Cleaning', category: 'Cleaning', price: 99, rating: 4.9, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80', description: 'A thorough room-by-room clean for a fresh, comfortable home. Supplies and equipment are included.' },
  { title: 'Washer & Dryer Repair', category: 'Appliance Repair', price: 75, rating: 4.7, image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=900&q=80', description: 'Diagnostic and repair service for washers and dryers, including common drainage, noise, and heating issues.' },
  { title: 'Refrigerator Repair Visit', category: 'Appliance Repair', price: 85, rating: 4.8, image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=900&q=80', description: 'Restore dependable cooling with a professional refrigerator diagnostic and repair visit at your convenience.' },
  { title: 'Move-In / Move-Out Clean', category: 'Cleaning', price: 129, rating: 4.9, image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=80', description: 'Detailed cleaning for a seamless move, including kitchens, bathrooms, floors, cabinets, and high-touch areas.' },
  { title: 'Ceiling Fan Installation', category: 'Electrician', price: 89, rating: 4.8, image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80', description: 'Professional ceiling fan installation or replacement with safe wiring and a clean finish.' }
];
await connectDB();
await Promise.all([Booking.deleteMany(), Service.deleteMany(), User.deleteMany()]);
await Service.insertMany(services);
const password = await bcrypt.hash('Admin123!', 12);
await User.create({ name: 'ServiceHub Admin', email: 'admin@servicehub.local', password, role: 'admin' });
console.log('Seeded 8 services. Admin: admin@servicehub.local / Admin123!');
process.exit(0);
