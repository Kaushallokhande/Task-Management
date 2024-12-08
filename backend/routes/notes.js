const express = require('express');
const router = express.Router();
const fetchUser = require('../midlleware/fetchUser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//Router 1: Get All the Notes , using Get: "/api/notes/fetchallnotes".Login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        console.log(req.user.id + "User Id issue");

        const note = await Notes.find({ user: req.user.id });
        res.json(note)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error')
    }
})

//Router 2: Add new Note , using Post: "/api/notes/addnote".Login required
router.post('/addnote', fetchUser, [
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'enter atleast 6 character in description').isLength({ min: 6 }),
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }

    const { title, description, tag } = req.body;
    try {
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const saveNotes = await note.save()
        res.json(saveNotes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error')
    }
})

//Router 3:Update notes , using Put: "/api/notes/updatenote".Login required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        //Create a new Note object
        const newNote = {}
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find the note to be updated and update it
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).send('Not found') }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed')
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error')
    }

})

//Router 4: Delete notes , using Delete: "/api/notes/deletenote".Login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        //Find the note to be delete and delete it
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).send('Not found') }

        //Allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed')
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error')
    }
})


module.exports = router