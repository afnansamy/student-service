'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    toJSON() {
      return { ...this.get(), password: undefined }
  }
  };
  Student.init({
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
      allowNull: false,
      unique: true,
      isEmail: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      isDate: true,
    },
    student_phone_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    parent_phone_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'students',
    modelName: 'Student',
    
  });
  
  return Student;
};
