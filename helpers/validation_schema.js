const Joi = require('joi');
const { Student } = require('../models');

const createStudentScheme = Joi.object({
  card_id: Joi.string().required(),
  name: Joi.string().required().min(3),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
  birth_date: Joi.date().required(),
  student_phone_number : Joi.string().length(11).pattern(/^[0-9]+$/).required(),
  parent_phone_number : Joi.string().length(11).pattern(/^[0-9]+$/).required(),
});

const updateStudentScheme = Joi.object({
  card_id: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  birth_date: Joi.date().required(),
  student_phone_number : Joi.string().length(11).pattern(/^[0-9]+$/).required(),
  parent_phone_number : Joi.string().length(11).pattern(/^[0-9]+$/).required(),
});

const valid_unique_values = async ({card_id, email, student_phone_number, parent_phone_number}) => {
  let student = await Student.findOne({where: {card_id}})
  if(student) {
    return {
      success: false,
      message: "card id must be unique"
    }
  }
  student = await Student.findOne({where: {email}})
  if(student){
    return {
      success: false,
      message: "email must be unique"
    }
  }
  student = await Student.findOne({where: {student_phone_number}});
  if(student){
    return {
      success: false,
      message: "student phone number must be unique"
    }
  }
  student = await Student.findOne({where: {parent_phone_number}});
  if(student){
    return {
      success: false,
      message: "parent phone number must be unique"
    }
  }

  return true;
}

module.exports = {
  createStudentScheme,
  updateStudentScheme,
  valid_unique_values
}