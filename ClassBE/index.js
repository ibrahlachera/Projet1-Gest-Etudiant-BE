const express  = require('express');
const cors     = require('cors');
const app      = express();


//routes
const etudiants = require('./routes/etudiants')
const enseignants = require('./routes/enseignants')
const notes = require('./routes/notes')



app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/api/etudiants', etudiants);
app.use('/api/enseignants', enseignants);
app.use('/api/notes', notes);


const port = 3000;
app.listen(port, () => console.log('server is running...'));
