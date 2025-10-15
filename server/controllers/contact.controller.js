import Contact from "../models/contact.model.js";

// GET /api/contacts
export const getAll = async (_req, res) => {
  const items = await Contact.find().lean();
  res.json(items);
};

// GET /api/contacts/:id
export const getById = async (req, res) => {
  const item = await Contact.findById(req.params.id).lean();
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
};

// POST /api/contacts
export const createOne = async (req, res) => {
  const { firstname, lastname, email } = req.body || {};
  if (!firstname || !lastname || !email) {
    return res.status(400).json({ message: "firstname, lastname, and email are required" });
  }
  const created = await Contact.create({ firstname, lastname, email });
  res.status(201).json(created);
};

// PUT /api/contacts/:id
export const updateById = async (req, res) => {
  const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).lean();
  if (!updated) return res.status(404).json({ message: "Not found" });
  res.json(updated);
};

// DELETE /api/contacts/:id
export const removeById = async (req, res) => {
  const deleted = await Contact.findByIdAndDelete(req.params.id).lean();
  if (!deleted) return res.status(404).json({ message: "Not found" });
  res.json({ ok: true });
};

// DELETE /api/contacts
export const removeAll = async (_req, res) => {
  await Contact.deleteMany({});
  res.json({ ok: true });
};
