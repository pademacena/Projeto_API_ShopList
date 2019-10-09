const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const Tasks = require('../models/tasks');

const router = express.Router();

//registrar usuario
router.post('/register', async (req, res) => {
    const { email } = req.body;

    try{
        if ( await User.findOne({ email })){
            return res.status(400).send({ error: 'User already exist '});
        }

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({ user });
    } catch (err) {
        return res.status(400).send({ error: 'Registration Failed' })
    }
});


//validacao de usuario
router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user =await User.findOne({ email }).select('+password');

    if (!user){
        return res.status(400).send({ error: 'User not found' });
    }

    if (!await bcrypt.compare(password, user.password)){
        return res.status(400).send({ error: 'Invalid Password' });
    }

    res.send({ user });

});

//criar Tasks
router.post('/createTasks', async (req, res) => {
    try{

        const { id_user, title } = req.body;

        const tasks = await Tasks.create({
           id_user,
            title,
        });

        return res.send({ tasks });
    } catch (err) {
        return res.status(400).send({ error: 'Registration Failed' })
    }
});

//get Tasks
router.get('/showTasks', async(req, res) => {
    const { id_user } = req.body;


    const tasks = await Tasks.find({ id_user });

    return res.json(tasks);

});

module.exports = app => app.use('/auth', router);