const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Role = require("../models/Role");

exports.signup = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await User.create({ fullName, email, password: hashedPass });

    if (role) {
      const userRole = await Role.findOne({ where: { name: role } });
      if (userRole) await user.addRole(userRole);
    }

    res.json({ message: "Signup successful!", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.json({ message: "Login successful!", token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
