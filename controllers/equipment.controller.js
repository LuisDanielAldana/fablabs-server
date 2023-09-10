const Equipment = require('../models/equipment.model').Equipment

async function createEquipment(req, res){
    const registration_number = req.body.registration_number;
    const name = req.body.name;
    const image = req.body.image;
    const price = req.body.price;

    try{
        const equipment = await new Equipment({
            registration_number: registration_number,
            name: name,
            image: "https://res.cloudinary.com/dficrwc6r/image/upload/v1694302079/cortadora-laser_i0entg.jpg",
            price: price
        }).save()
        res.status(201).json({
            message: "Equipment successfully created",
            obj: equipment
        })
    } catch (e){
        res.status(500).json({
            error: e,
            message: "Error creating equipment"
        })
    }
}

async function getEquipment(req, res){
    const search = req.query.search;
    const reg = new RegExp(`.*${search}.*`, 'i');

    try{
        if (search){
            const equipment = await Equipment.find({deleted: false}).or([{ 'name': { $regex: reg }}])
            res.status(200).json({
                message: "All coincidences",
                obj: equipment
            })
        } else {
            const equipment = await Equipment.find({deleted: false})
            res.status(200).json({
                message: "All equipment",
                obj: equipment
            })
        }


    }catch (e){
        res.status(500).json({
            error: e,
            message: "Error getting equipment"
        })
    }
}

async function getEquipmentById(req, res){
    const _id = req.params.equipmentId;
    try{
        const equipment = await Equipment.findOne({
            _id: _id,
            deleted: false
        })
        if(!equipment){
            res.status(404).json({message: "Equipment not fount"})
        }
        res.status(200).json({
            message: "Equipment found",
            obj: equipment
        })
    } catch (e) {
        res.status(500).json({
            error: e,
            message: "Error finding equipment"
        })
    }
}

async function updateEquipment(req, res){
    const _id = req.params.equipmentId;
    const registration_number = req.body.registration_number;
    const name = req.body.name;
    const image = req.body.image;
    const price = req.body.price;

    try{
        const equipment = await Equipment.updateOne({
            _id: _id
        },{
            registration_number: registration_number,
            name: name,
            image: image,
            price: price
        })
        res.status(200).json({
            message: "Equipment successfully updated",
            obj: equipment
        })
    } catch (e){
        res.status(500).json({
            error: e,
            message: "Error updating equipment"
        })
    }
}

async function changeDeleteStatus(req, res){
    const _id = req.params.equipmentId;
    try{
        const equipment = await Equipment.findOne({_id: _id});

        if (!equipment) {
            return res.status(404).json({ message: 'User not found' });
        }

        equipment.deleted = !equipment.deleted;

        await equipment.save();

        res.status(200).json({
            message: "Equipment status changed",
        })
    }catch (e){
        res.status(500).json({
            error: e,
            message: "Trouble changing status"
        })
    }
}

async function changeStatus(req, res){
    const _id = req.params.equipmentId;
    try{
        const equipment = await Equipment.findOne({_id: _id});

        if (!equipment) {
            return res.status(404).json({ message: 'User not found' });
        }

        equipment.available = !equipment.available;

        await equipment.save();

        res.status(200).json({
            message: "Equipment status changed",
        })
    }catch (e){
        res.status(500).json({
            error: e,
            message: "Trouble changing status"
        })
    }
}

async function addMaterial(req, res){
    const _id = req.params.equipmentId;
    const material = req.body.material;
    const image = req.body.image;
    const price = req.body.price;
    try {
        const equipment = await Equipment.findOne({_id: _id});

        if (!equipment) {
            return res.status(404).json({ message: 'Equipment not found' });
        }

        equipment.material.push({
            material: material,
            image: "https://res.cloudinary.com/dficrwc6r/image/upload/v1694304482/mdf_zc9k2c.jpg",
            price: price
        });
        await equipment.save();

        return res.status(200).json({
            message: 'Material added to equipment successfully',
            obj: equipment
        });

    }catch (e){
        res.status(500).json({
            error: e,
            message: "Error adding material"
        })
    }
}

async function removeMaterial(req, res){
    const equipmentId = req.params.equipmentId;
    const materialId = req.body.materialId;

    try {
        const equipment = await Equipment.findById(equipmentId);

        if (!equipment) {
            return res.status(404).json({ message: 'Equipment not found' });
        }

        equipment.material = equipment.material.filter((material) => material._id.toString() !== materialId);

        await equipment.save();

        return res.status(200).json({
            message: "Material successfully removed",
            obj: equipment
        })
    } catch (e) {
        res.status(500).json({
            error: e,
            message: "Error removing material"
        })
    }
}

module.exports = {
    createEquipment,
    getEquipment,
    getEquipmentById,
    updateEquipment,
    changeDeleteStatus,
    changeStatus,
    addMaterial,
    removeMaterial
}
