export const makeCrud = (Model) => ({
  getAll: async (_req, res) => res.json(await Model.find().lean()),
  getById: async (req, res) => {
    const item = await Model.findById(req.params.id).lean();
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  },
  createOne: async (req, res) => {
    const created = await Model.create(req.body);
    res.status(201).json(created);
  },
  updateById: async (req, res) => {
    const updated = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    }).lean();
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  },
  removeById: async (req, res) => {
    const deleted = await Model.findByIdAndDelete(req.params.id).lean();
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ ok: true });
  },
  removeAll: async (_req, res) => {
    await Model.deleteMany({});
    res.json({ ok: true });
  }
});
