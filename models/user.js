import { DataTypes, Model } from "sequelize";

import db from "../config/db";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
    },
    position: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    tableName: "users",
    modelName: "User",
  }
);

export default User;
