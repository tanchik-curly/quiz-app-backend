import User from "./user";
import Quizzes from "./quiz";
import Questions from "./questions";
import Options from "./options";
import QuizReview from "./quiz-review";

Questions.hasMany(Options, {
  foreignKey: "questionId",
});

Options.belongsTo(Questions, { foreignKey: "questionId" });

Quizzes.hasMany(Questions, {
  foreignKey: "quizId",
});

Questions.belongsTo(Quizzes, {
  foreignKey: "quizId",
});

User.hasMany(QuizReview, {
  foreignKey: "userId",
});

QuizReview.belongsTo(User, {
  foreignKey: "userId",
});

Quizzes.hasMany(QuizReview, {
  foreignKey: "quizId",
});

QuizReview.belongsTo(Quizzes, {
  foreignKey: "quizId",
});

const models = {
  User,
  Quizzes,
  Questions,
  Options,
  QuizReview,
};

export default models;
