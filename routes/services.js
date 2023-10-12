var express = require('express');
var router = express.Router();

const serviceController = require('../controllers/service.controller')

router.get('/', serviceController.getServices);
router.get('/:serviceId', serviceController.getServiceById)
router.post('/', serviceController.createService);
router.put('/:serviceId', serviceController.updateService);
router.put('/:serviceId/changeDeleteStatus', serviceController.changeDeleteStatus);
router.put('/:serviceId', serviceController.addEquipment);
router.put('/:serviceId', serviceController.removeEquipment);
router.get('/:serviceId/getEquipment', serviceController.getEquipment);

module.exports = router;
