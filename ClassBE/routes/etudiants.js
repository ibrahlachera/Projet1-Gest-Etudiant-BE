const express = require('express')
const multer = require("multer");
const Note  = require("./../models/note");
//Models
const Etudiant   = require("./../models/etudiant");
const Joi      = require('joi');
const route = express.Router();


const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
  };
  
  const storage = multer.diskStorage({
    destination: 'public/import/etudiant',
    filename: (req, file, cb) => {
      const name = file.originalname
        .toLowerCase()
        .split(" ")
        .join("-");
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, name + "-" + Date.now()+"."+ext);
    }
  });
  

route.get('/', async (req, res) => {

    const etudiants = await Etudiant.find().populate('notes');
    res.send(etudiants);
})

route.get('/:id',async (req, res) => {
    
    let id = req.params.id;
    const etudiant = await Etudiant.findById(id);
    const note = await Note.find({etudiant_id: id});
    etudiant.notes = note;
    res.send(etudiant);

})
route.get('/:id/notes',async (req, res) => {
    
    let id = req.params.id;
    const notes = await Note.find({etudiant_id: id});
    res.send(notes);
})

// route.get('/filiere=:filiere',async (req, res) => {
//     let filiere = req.params.filiere;
//     const etudiant = await Etudiant.findById(filiere);
//     res.send(etudiant);
// })

route.post('/',multer({ storage: storage }).single('image'),async (req, res) => {
   

     
      let etudiant = new Etudiant();
     
      const url = req.protocol + "://" + req.get("host");
      etudiant.image = url+"/import/etudiant/"+ req.file.filename;

      etudiant.cin= req.body.cin;
    etudiant.cne= req.body.cne;
    etudiant.fullname= req.body.fullname;
    etudiant.email= req.body.email;
    etudiant.filiere = req.body.filiere;
    etudiant.anscol= req.body.anscol;
    //etudiant.notes = req.body.notes;
      
      let result = await etudiant.save();

    res.send(result)
})

route.put('/:id',async (req, res) => {
    
    let id = req.params.id;
    let etud = await Etudiant.findOne({_id: id})
    
    etud.cin = req.body.cin;
    etud.cne = req.body.cne;
    etud.fullname = req.body.fullname;
    etud.email = req.body.email;
    
let result = await etud.save();
    res.send(result);

})


route.delete('/:id',async (req, res) => {
    
    let id = req.params.id;
    
    let result = await Etudiant.deleteOne({_id: id})
    res.send(result);

})

module.exports = route;