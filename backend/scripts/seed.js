import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Service from '../models/Service.js';
import Booking from '../models/Booking.js';

const services = [
  { title: 'Expert AC Repair & Tune-Up', category: 'AC Repair', price: 79, duration: 90, rating: 4.9, reviewCount: 124, providerName: 'Marcus Cooling Co.', location: 'Greater local area', image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80', description: 'Keep your home cool and efficient with a full AC inspection, cleaning, and repair from a certified local technician.' },
  { title: 'Licensed Home Electrician', category: 'Electrician', price: 65, duration: 60, rating: 4.9, reviewCount: 98, providerName: 'Ava Electric', location: 'Greater local area', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80', description: 'Safe, reliable electrical repairs for switches, outlets, lighting, breakers, and everyday home electrical issues.' },
  { title: 'Same-Day Plumbing Fix', category: 'Plumber', price: 59, duration: 60, rating: 4.8, reviewCount: 207, providerName: 'Riverside Plumbing', location: 'Greater local area', image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=900&q=80', description: 'Fast help for leaks, clogged drains, fixtures, and plumbing problems with transparent pricing before work begins.' },
  { title: 'Deep Home Cleaning', category: 'Cleaning', price: 99, duration: 180, rating: 4.9, reviewCount: 172, providerName: 'BrightNest Cleaning', location: 'Greater local area', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80', description: 'A thorough room-by-room clean for a fresh, comfortable home. Supplies and equipment are included.' },
  { title: 'Washer & Dryer Repair', category: 'Appliance Repair', price: 75, duration: 90, rating: 4.7, reviewCount: 81, providerName: 'Home Appliance Pro', location: 'Greater local area', image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=900&q=80', description: 'Diagnostic and repair service for washers and dryers, including common drainage, noise, and heating issues.' },
  { title: 'Refrigerator Repair Visit', category: 'Appliance Repair', price: 85, duration: 90, rating: 4.8, reviewCount: 111, providerName: 'Home Appliance Pro', location: 'Greater local area', image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=900&q=80', description: 'Restore dependable cooling with a professional refrigerator diagnostic and repair visit at your convenience.' },
  { title: 'Move-In / Move-Out Clean', category: 'Cleaning', price: 129, duration: 240, rating: 4.9, reviewCount: 154, providerName: 'BrightNest Cleaning', location: 'Greater local area', image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=80', description: 'Detailed cleaning for a seamless move, including kitchens, bathrooms, floors, cabinets, and high-touch areas.' },
  { title: 'Ceiling Fan Installation', category: 'Electrician', price: 89, duration: 90, rating: 4.8, reviewCount: 74, providerName: 'Ava Electric', location: 'Greater local area', image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80', description: 'Professional ceiling fan installation or replacement with safe wiring and a clean finish.' }
];
await connectDB();
const password = await bcrypt.hash('Admin123!', 12);
await User.updateOne({ email: 'admin@servicehub.local' }, { $setOnInsert: { name: 'ServiceHub Admin', email: 'admin@servicehub.local', password, role: 'admin' } }, { upsert: true });
for (const provider of [{ name: 'Ava Patel', email: 'ava@servicehub.local', bio: 'Licensed residential electrician.', location: 'Greater local area' }, { name: 'Marcus Reed', email: 'marcus@servicehub.local', bio: 'Certified HVAC technician.', location: 'Greater local area' }, { name: 'Nina Brooks', email: 'nina@servicehub.local', bio: 'Home-care specialist.', location: 'Greater local area' }]) {
  await User.updateOne({ email: provider.email }, { $setOnInsert: { name: provider.name, email: provider.email, password, role: 'provider', providerProfile: { bio: provider.bio, location: provider.location } } }, { upsert: true });
}
for (const service of services) await Service.updateOne({ title: service.title }, { $set: service }, { upsert: true });
console.log('Seeded or updated 8 services and local provider accounts. Admin: admin@servicehub.local / Admin123!');
process.exit(0);
