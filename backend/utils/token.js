import jwt from 'jsonwebtoken';

export function sendToken(res, user, statusCode = 200) {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
  res.status(statusCode).json({ user: publicUser(user) });
}

export function publicUser(user) {
  return { id: user._id, name: user.name, email: user.email, role: user.role, profileImage: user.profileImage, createdAt: user.createdAt };
}
