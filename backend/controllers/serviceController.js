import Service from '../models/Service.js';

const allowed = ['title', 'description', 'category', 'price', 'duration', 'image', 'rating', 'reviewCount', 'providerId', 'providerName', 'location', 'availableSlots', 'isActive'];
function payload(body) { return Object.fromEntries(Object.entries(body).filter(([key]) => allowed.includes(key))); }
function validate(data) { return data.title && data.description && data.category && data.price !== undefined; }
const providerPopulate = { path: 'providerId', select: 'name profileImage phone providerProfile' };

export async function getServices(req, res, next) {
  try {
    const { search = '', category = '' } = req.query;
    const query = { isActive: true };
    if (search) query.$or = [{ title: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }, { providerName: { $regex: search, $options: 'i' } }];
    if (category) query.category = category;
    res.json({ services: await Service.find(query).populate(providerPopulate).sort({ createdAt: -1 }) });
  } catch (error) { next(error); }
}
export async function getService(req, res, next) { try { const service = await Service.findOne({ _id: req.params.id, isActive: true }).populate(providerPopulate); if (!service) return res.status(404).json({ message: 'Service not found.' }); res.json({ service }); } catch (error) { next(error); } }
export async function getAllServices(req, res, next) { try { res.json({ services: await Service.find().populate(providerPopulate).sort({ createdAt: -1 }) }); } catch (error) { next(error); } }
export async function createService(req, res, next) { try { const data = payload(req.body); if (!validate(data)) return res.status(400).json({ message: 'Title, description, category and price are required.' }); const service = await Service.create(data); res.status(201).json({ service }); } catch (error) { next(error); } }
export async function updateService(req, res, next) { try { const service = await Service.findByIdAndUpdate(req.params.id, payload(req.body), { new: true, runValidators: true }); if (!service) return res.status(404).json({ message: 'Service not found.' }); res.json({ service }); } catch (error) { next(error); } }
export async function deleteService(req, res, next) { try { const service = await Service.findByIdAndDelete(req.params.id); if (!service) return res.status(404).json({ message: 'Service not found.' }); res.json({ message: 'Service deleted.' }); } catch (error) { next(error); } }
