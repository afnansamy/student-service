const router = require('express').Router();
const StudentsController = require('../controllers/StudentsController');

//SHOW ALL STUDENTS
router.get('/', StudentsController.index);
//CREATE STUDENT
router.post('/', StudentsController.store)
//FIND ONE STUDENT BY CARD ID
router.get('/:card_id', StudentsController.show);
//FIND ONE STUDENT BY EMAIL
router.get('/:email/find_by_email', StudentsController.findByEmail);
//UPDATE STUDENT
router.put('/:card_id/update', StudentsController.update);
//DELETE STUDENT
router.delete('/:card_id/destroy', StudentsController.destroy);

module.exports = router;
