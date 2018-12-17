const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/Classe',{ useNewUrlParser: true })
        .then(()=>console.log("Everything is Okey Proffessor ..."))
        .catch((error)=> console.error(message.error));

const etudiantSchema= mongoose.Schema({
    image: String,
    cin: String,
    cne: String,
    fullname: String,
    email: String,
    filiere: String,
    anscol: String,
    notes:[]
})

module.exports = mongoose.model('Etudiant',etudiantSchema);