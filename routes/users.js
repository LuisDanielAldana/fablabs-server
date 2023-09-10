var express = require('express');
var router = express.Router();

const userController = require('../controllers/user.controller')

router.get('/', userController.getUsers);
router.get('/:userId', userController.getUserById)
router.post('/', userController.createUser);
router.put('/:userId', userController.updateUser);
router.put('/:userId/changeDeleteStatus', userController.changeDeleteStatus);
router.post('/login', userController.login);


module.exports = router;
