import { Model, DataTypes } from "sequelize";

import db from "../config/db";

class Quizzes extends Model {}

Quizzes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    minutesToFinish: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
    tableName: "quizzes",
    modelName: "Quizzes",
  }
);

export default Quizzes;
