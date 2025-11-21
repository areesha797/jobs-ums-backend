const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Role = require("./Role");

const UserRole = sequelize.define("UserRole", {});

// Relations
User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

module.exports = UserRole;
