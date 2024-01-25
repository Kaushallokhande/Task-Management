const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const {body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'madebydevil'
const fetchUser = require('../midlleware/fetchUser');



//Router 1: Create user , using Post: "/api/auth/createuser" no login required
router.post('/createuser', [
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail(),
    body('password', 'enter a valid password').isLength({ min: 6 }),
], async (req, res) => {
    let success = false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ success, error: error.array() })
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(404).json({ success, error: 'Email already exist' });
    }
    try {
        //create a new user
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })

        // .then(user => res.json(user)).catch((err) => {
        //     console.log(err);
        //     res.json({ error: 'enter valid Email' })
        // });

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtData);
        // res.json(user)
        success = true;
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error')
    }
})

//Router 2: Authenticate , using Post: "/api/auth/login"
router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'enter a valid password').exists(),
], async (req, res) => {
    let success = false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "Incorrect Email" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Incorrect email or password" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error')
    }
    //my test
    // let user = await User.findOne({ email: req.body.email});
    // let userpassword = await User.findOne({ password: req.body.password});
    // if(user && userpassword){
    //     res.json({email: 'welcome'})
    // }else if(user && !userpassword){
    //     res.json({password: 'password incorrect'})
    // }else if(!user && userpassword){
    //     res.json({email: 'email incorrect'})
    // }else{
    //     res.json({email: 'does not exist'})
    // }
})


//Router 3: Get User details , using Post: "/api/auth/getuser".Login required
router.post('/getuser', fetchUser , async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password').select('-date');
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error')
    }
})


module.exports = router