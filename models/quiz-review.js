import { Model, DataTypes } from "sequelize";

import db from "../config/db";

class QuizReview extends Model {}

QuizReview.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    answer: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    optionId: {
      type: DataTypes.INTEGER,
    },
    questionId: {
      type: DataTypes.INTEGER,
    },
    quizId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
    tableName: "quiz-review",
    modelName: "QuizReview",
  }
);

export default QuizReview;
