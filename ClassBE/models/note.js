const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/Classe',{ useNewUrlParser: true })
        .then(()=>console.log("Everything is Okey Proffessor ..."))
        .catch((error)=> console.error(message.error));

const noteSchema= mongoose.Schema({
        etudiant_id:String,
        matiere: String,
        semestre: String,
        note: Number
})

module.exports = mongoose.model('Note',noteSchema);