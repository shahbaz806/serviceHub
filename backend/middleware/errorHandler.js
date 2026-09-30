export function notFound(req, res) { res.status(404).json({ message: `Route not found: ${req.originalUrl}` }); }
export function errorHandler(err, req, res, next) {
  console.error(err);
  if (err.name === 'CastError') return res.status(400).json({ message: 'Invalid resource ID.' });
  if (err.code === 11000) return res.status(409).json({ message: 'That email is already registered.' });
  if (err.name === 'ValidationError') return res.status(400).json({ message: Object.values(err.errors)[0].message });
  res.status(err.statusCode || 500).json({ message: err.message || 'Something went wrong.' });
}
