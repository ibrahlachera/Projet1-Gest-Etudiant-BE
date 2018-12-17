const mongoose = require('mongoose');



mongoose.connect('mongodb://localhost/Classe',{ useNewUrlParser: true })
        .then(() => console.log('mongo its here...'))
        .catch((error) => console.error(error.message));



const ensSchema = mongoose.Schema({
   userName:String,
    password: String
});

module.exports = mongoose.model('Enseignant', ensSchema);
