import { Model, DataTypes } from "sequelize";

import db from "../config/db";

class Questions extends Model {}

Questions.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quizId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
    tableName: "questions",
    modelName: "Questions",
  }
);

export default Questions;
