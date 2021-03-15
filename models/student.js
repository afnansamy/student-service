'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

      toJSON() {
          return { ...this.get(), id: undefined }
      }
  };
    Student.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
      name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              notNull: { msg: 'STUDENT MUST HAVE a NAME'},
              notEmpty: {msg: 'NAME MUST NOT BE EMPTY'}
          }
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          isEmail: true,
          validate: {
              notNull: { msg: 'STUDENT MUST HAVE an EMAIL' },
              notEmpty: { msg: 'EMAIL MUST NOT BE EMPTY' }
          }
      },
      birthdate: {
          type: DataTypes.DATE,
          allowNull: false,
          isDate: true,
          validate: {
              notNull: { msg: 'STUDENT MUST HAVE a BIRTHDATE' },
              notEmpty: { msg: 'BIRTHDATE MUST NOT BE EMPTY' }
          }
      },
      phonenumber: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
          validate: {
              notNull: { msg: 'STUDENT MUST HAVE a PHONENUMBER' },
              notEmpty: { msg: 'PHONENUMBER MUST NOT BE EMPTY' }
          }
      },
    },
    {
    sequelize,
    tableName: 'students',
    modelName: 'Student',
    });
  return Student;
};