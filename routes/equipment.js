var express = require('express');
var router = express.Router();

const equipmentController = require('../controllers/equipment.controller')

router.get('/', equipmentController.getEquipment);
router.get('/:equipmentId', equipmentController.getEquipmentById)
router.post('/', equipmentController.createEquipment);
router.put('/:equipmentId', equipmentController.updateEquipment);
router.put('/:equipmentId/changeDeleteStatus', equipmentController.changeDeleteStatus);
router.put('/:equipmentId/changeStatus', equipmentController.changeStatus);
router.post('/:equipmentId/addMaterial', equipmentController.addMaterial);
router.put('/:equipmentId/removeMaterial', equipmentController.removeMaterial)



module.exports = router;
