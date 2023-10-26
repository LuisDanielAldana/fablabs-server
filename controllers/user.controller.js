const User = require('../models/user.model').User;
const authController = require('../controllers/auth.controller')

const bcrypt = require("bcryptjs")

async function createUser(req, res){
        const name = req.body.name;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const password = req.body.password;
        try{
            const user = await new User({
                name: name,
                lastname: lastname,
                email: email,
                password: password,
            }).save();
            res.status(201).json({
                obj: user,
                message: "User created"
            })

        } catch (e){
            res.status(500).json({
                error: e,
                message: "Error creating user"
            })
        }
}

async function getUsers(req, res){
    const search = req.query.search;
    const reg = new RegExp(`.*${search}.*`, 'i');
    try{
        if(search){
            const users = await User.find({deleted: false}, {password:0}).or([{ 'name': { $regex: reg }}, { 'lastName': { $regex: reg }}, { 'email': { $regex: reg }}])
            res.status(200).json({
                message: "All coincidences",
                obj: users
            })
        } else {
            const users = await User.find({deleted: false}, {password: 0})
            res.status(200).json({
                message: "All users",
                obj: users
            })
        }
    }catch (e){
        res.status(500).json({
            error: e,
            message: "Can't get users"
        })
    }
}

async function getUserById(req, res){
    const _id = req.params.userId;
    try{
        const user = await User.findOne({
                _id: _id,
                deleted: false
            },
            {password:0}
        )
        res.status(200).json({
            message: "User found",
            obj: user
        })
    }catch (e){
        res.status(500).json({
            message: "Error finding user"
        })
    }
}

async function updateUser(req, res){
    const _id = req.params.userId;
    const registration_number = req.body.registration_number;
    const name = req.body.name;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    const credit = req.body.credit;
    try{
        const user = await User.findOneAndUpdate({_id: _id},
            {
                registration_number: registration_number,
                name: name,
                lastname: lastname,
                email: email,
                password: password,
                role: role,
                credit: credit
            });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User updated successfully'});
    } catch (e){
        res.status(500).json({
            error: e,
            message: "Can't update user",
        })
    }
}

async function changeDeleteStatus(req, res){
    const _id = req.params.userId;
    try{
        const user = await User.findOne({_id: _id});

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.deleted = !user.deleted;

        await user.save();

        res.status(200).json({
            message: "User status changed",
            obj: null
        })
    }catch (e){
        res.status(500).json({
            error: e,
            message: "Trouble changing status"
        })
    }
}

async function login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    try{
        const user = await User.findOne({
            email: email
        });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = authController.generateJWT(user._id, user.email, user.role)

        res.status(200).json({
            token: token,
            message: 'Login successful'
        });
    } catch (e){
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }





}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    changeDeleteStatus,
    login
}
