import User from "../models/userModel.js";

// GET USER --------------------------------------------------
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "requestedServices.serviceId"
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to load user" });
  }
};

// SUBMIT SERVICE REQUEST ------------------------------------
export const submitRequest = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    req.body.forEach((r) => {
      user.requestedServices.push(r);
    });

    await user.save();
    res.json({ message: "Service request submitted!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit request" });
  }
};

// GET PREVIOUS REQUESTS -------------------------------------
export const getRequests = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "requestedServices.serviceId"
    );
    res.json(user.requestedServices);
  } catch (err) {
    res.status(500).json({ error: "Failed to load requests" });
  }
};

// UPDATE A REQUEST ------------------------------------------
export const updateRequest = async (req, res) => {
  try {
    const { userId, requestId } = req.params;
    const { description, stage } = req.body;

    const user = await User.findById(userId);
    const request = user.requestedServices.id(requestId);

    request.description = description ?? request.description;
    request.stage = stage ?? request.stage;

    await user.save();
    res.json({ message: "Request updated", request });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update request" });
  }
};
