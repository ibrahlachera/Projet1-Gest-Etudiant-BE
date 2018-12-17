const express = require('express')

//Models
const Note  = require("./../models/note");
const Joi      = require('joi');
const route = express.Router();



route.get('/', async (req, res) => {

    const notes = await Note.find();
    res.send(notes);
})

route.get('/:id',async (req, res) => {
    let id = req.params.id;
    const note = await Note.findById(id);


    res.send(note);
})


route.post('/',async (req, res) => {
   
   

     
      let note = new Note();
      note.etudiant_id = req.body.etudiant_id;
      note.matiere =  req.body.matiere;
      note.semestre=  req.body.semestre;
      note.note = req.body.note;
      
      let result = await note.save();

    res.send(result)
})

route.delete('/:id',async (req, res) => {
    
    let id = req.params.id;
    
    let result = await Note.deleteOne({_id: id})
    res.send(result);

})

module.exports = route;