import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { publicUser, sendToken } from '../utils/token.js';

export async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required.' });
    if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ message: 'Enter a valid email address.' });
    if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashedPassword });
    sendToken(res, user, 201);
  } catch (error) { next(error); }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' });
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: 'Invalid email or password.' });
    sendToken(res, user);
  } catch (error) { next(error); }
}

export function logout(req, res) { res.clearCookie('token', { httpOnly: true, sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', secure: process.env.NODE_ENV === 'production' }).json({ message: 'Logged out successfully.' }); }
export function profile(req, res) { res.json({ user: publicUser(req.user) }); }
export async function updateProfile(req, res, next) {
  try {
    const { name, profileImage } = req.body;
    if (name && name.trim().length < 2) return res.status(400).json({ message: 'Name must be at least 2 characters.' });
    req.user.name = name?.trim() || req.user.name;
    if (typeof profileImage === 'string') req.user.profileImage = profileImage.trim();
    await req.user.save();
    res.json({ user: publicUser(req.user), message: 'Profile updated.' });
  } catch (error) { next(error); }
}
