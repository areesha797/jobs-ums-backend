const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, role } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.status = user.status === "active" ? "inactive" : "active";
    await user.save();

    res.json({ message: `User is now ${user.status}`, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
