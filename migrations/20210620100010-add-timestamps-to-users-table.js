"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        "users",
        "createdAt",
        { type: Sequelize.DATE },
        { transaction: t }
      );
      await queryInterface.addColumn(
        "users",
        "updatedAt",
        { type: Sequelize.DATE },
        { transaction: t }
      );
      t.commit();
    } catch (err) {
      console.log(err);
      t.rollback();
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
