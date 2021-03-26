const { Student } = require('../models');
const { createStudentScheme, updateStudentScheme, valid_unique_values } = require('../helpers/validation_schema');

const index = async (req, res) => {
  try {
    const students = await Student.findAll();
    return res.json({
        success: true,
        students
    });
  } catch (err) {
      return res.status(500).json({ error: process.env.APP_ENV === 'local' ? err : "Something went wrong"});
  }
}

const store = async (req, res) => {
  try {
    const result = await createStudentScheme.validateAsync(req.body);
    const validated = await valid_unique_values(result);
    if(validated === true) {
      const student = await Student.create(result)
      delete student.password;
      return res.json({
        success: true,
        student
      });
    } else {
      res.status(422).json(validated)
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: process.env.APP_ENV === 'local' ? err : "Something went wrong"});
  }
}

const show = async (req, res) => {
  const card_id = req.params.card_id;
  try {
      const student = await Student.findOne({
          where: { card_id }
      });
      return res.json({
        success: true,
        student
      });
  } catch (err) {
    return res.status(500).json({ error: process.env.APP_ENV === 'local' ? err : "Something went wrong"});
  }
}

const findByEmail = async (req, res) => {
  const email = req.params.email;
  try {
      const student = await Student.findOne({
          where: { email }
      });
      return res.json({
        success: true,
        student
      });
  } catch (err) {
    return res.status(500).json({ error: process.env.APP_ENV === 'local' ? err : "Something went wrong"});
  }
}

const update = async (req, res) => {
  const card_id = req.params.card_id
  const { name, email, birth_date, student_phone_number, parent_phone_number } = req.body
  
  try {
      const student = await Student.findOne({ where: { card_id } })

      student.name = name;
      student.email = email;
      student.birth_date = birth_date;
      student.student_phone_number = student_phone_number;
      student.parent_phone_number = parent_phone_number;

      await student.update()

      return res.json({
        success: true,
        student
      })

  } catch (err) {
    return res.status(500).json({ error: process.env.APP_ENV === 'local' ? err : "Something went wrong"});
  }
}

const destroy = async (req, res) => {
  const card_id = req.params.card_id
  try {
    const student = await Student.findOne({ where: { card_id } })
    await student.destroy()

    return res.json({ success: true, message: 'STUDENT DELETED' });
  } catch (err) {
    return res.status(500).json({ error: process.env.APP_ENV === 'local' ? err : "Something went wrong"});
  }
}


module.exports = {
  index,
  store,
  show,
  update,
  destroy
}
