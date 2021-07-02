import { Model, DataTypes } from "sequelize";

import db from "../config/db";
import Questions from "./questions";

class Options extends Model {}

// Questions.hasMany(Options, {
//   foreignKey: "questionId",
// });
// Options.belongsTo(Questions);

Options.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    option: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correctOption: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    questionId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
    tableName: "options",
    modelName: "Options",
  }
);

export default Options;
