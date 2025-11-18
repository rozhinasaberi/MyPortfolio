export const signup = async (req, res) => {
    try {
      const { name, email, password } = req.body; // ❌ no role here
  
      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(400).json({ message: "Email already in use" });
      }
  
      const user = await User.create({
        name,
        email,
        password,
        role: "user", // ⭐ ensure normal signup is always user
      });
  
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
  
      res.status(201).json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      console.error("Signup error:", err);
      res.status(500).json({ message: "Server error" });
    }
  };
  