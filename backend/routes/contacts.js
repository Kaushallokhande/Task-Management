const express = require('express');
const router = express.Router();
const fetchUser = require('../midlleware/fetchUser');
const Contacts = require('../models/Contacts');
const { body, validationResult } = require('express-validator');

//Router 1: Get All the Contacts , using Get: "/api/contacts/fetchallcontact".Login required
router.get('/fetchallcontact', fetchUser, async (req, res) => {
    try {

        const contact = await Contacts.find({ user: req.user.id });
        res.json(contact)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error')
    }
})

//Router 2: Add new Note , using Post: "/api/contacts/addcontact".Login required
router.post('/addcontact', fetchUser, [
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail(),
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }

    const { name, email } = req.body;
    try {
        const contact = new Contacts({
            name, email, user: req.user.id
        })
        const saveContacts = await contact.save()
        res.json(saveContacts)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error')
    }
})

module.exports = router