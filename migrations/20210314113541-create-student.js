'use strict';
module.exports = {
    up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('students', {
      card_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birth_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      student_phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parent_phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
    down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('students');
  }
};