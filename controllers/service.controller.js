const {User} = require("../models/user.model");
const {Equipment} = require("../models/equipment.model");
const Service = require('../models/service.model').Service

async function createService(req, res){
    const registration_number = req.body.registration_number;
    const name = req.body.name;
    const description = req.body.description;
    const image = req.body.image;
    try {
        const service = await new Service({
            registration_number: registration_number,
            name: name,
            description: description,
            image: "https://res.cloudinary.com/dficrwc6r/image/upload/v1694406318/dreamstime_s_59493062-min_i6mizu.jpg"
        }).save();
        res.status(201).json({
            message: "Service successfully created",
            obj: service
        })
    } catch (e){
        res.status(500).json({
            message: "Error creating service"
        })
    }
}

async function getServices(req, res){
    const search = req.query.search;
    const reg = new RegExp(`.*${search}.*`, 'i');
    try{
        if(search){
            const services = await Service.find({deleted: false}).or([{ 'name': { $regex: reg }}, { 'description': { $regex: reg }}])
            res.status(200).json({
                message: "All coincidences",
                obj: services
            })
        } else {
            const services = await Service.find({deleted: false})
            res.status(200).json({
                message: "All users",
                obj: services
            })
        }
    }catch (e){
        res.status(500).json({
            error: e,
            message: "Can't get services"
        })
    }
}

async function getServiceById(req, res){
    const _id = req.params.serviceId;
    try {
        const service = await Service.findOne({
            _id: _id,
            deleted: false
        })
        if(!service){
            res.status(404).json({message: "Service not found"})
        }
        res.status(200).json({
            message: "Service found",
            obj: service
        })
    } catch (e) {
        res.status(500).json({
            error: e,
            message: "Error getting service"
        })
    }
}

async function updateService(req, res){
    const _id = req.params.serviceId;
    const registration_number = req.body.registration_number;
    const name = req.body.name;
    const description = req.body.description;
    try{
        const service = await Service.updateOne({
            _id: _id
        },{
            registration_number: registration_number,
            name: name,
            description: description

        })
        if (!service){
            res.status(404).json({message: "Service not found"})
        }
        res.status(200).json({
            message: "Service successfully updated",
            obj: service
        })
    } catch (e) {
        res.status(500).json({
            error: e,
            message: "Error updating service"
        })
    }
}

async function changeDeleteStatus(req, res){
    const _id = req.params.serviceId;
    try {
            const service = await Service.findOne({_id: _id});

            if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        service.deleted = !service.deleted;

        await service.save();

        res.status(200).json({
            message: "Service status changed",
        })
    } catch (e) {
        res.status(500).json({
            error: e,
            message: "Error changing delete status of service"
        })
    }
}

async function addEquipment(req, res){
    const serviceId = req.params.serviceId;
    const equipmentId = req.body.equipmentId;
    try {
        const service = await Service.findById(serviceId);

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        service.equipment.push(equipmentId);

        await service.save();

        return res.status(200).json({ message: 'Equipment added to service successfully', service });
    } catch (e) {
        res.status(500).json({
            error: e,
            message: "Error adding equipment"
        })
    }
}

async function removeEquipment(req, res){
    const serviceId = req.params.serviceId;
    const equipmentId = req.body.equipmentId;
    try {
        const service = await Service.findById(serviceId);

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        const equipmentIndex = service.equipment.findIndex((equipId) => equipId.toString() === equipmentId);

        if (equipmentIndex === -1) {
            return res.status(404).json({ message: 'Equipment not found in service' });
        }

        service.equipment.splice(equipmentIndex, 1);

        // Save the updated service document
        await service.save();

        return res.status(200).json({ message: 'Equipment removed from service successfully', service });
    } catch (e) {
        res.status(500).json({
            error: e,
            message: "Error removing equipment"
        })
    }
}

//Get all equipment available for a service
async function getEquipment(req, res){
    const serviceId = req.params.serviceId;

    try {
        const service = await Service.findById(serviceId).populate('equipment');

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        const equipment = service.equipment;

        return res.status(200).json({ equipment });
    } catch (e) {
        res.status(500).json({
            error: e,
            message: "Error getting equipment from service"
        })
    }

}

module.exports = {
    createService,
    getServices,
    getServiceById,
    updateService,
    changeDeleteStatus,
    addEquipment,
    removeEquipment,
    getEquipment
}
