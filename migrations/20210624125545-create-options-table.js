"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("options", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      option: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      correctOption: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      questionId: {
        type: Sequelize.INTEGER,
        references: { model: "questions", key: "id" },
      },

      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("options");
  },
};
