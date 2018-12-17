const express = require('express');
const jwt    = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const Enseignant   = require("../models/enseignant");
const Joi      = require('joi');
const route = express.Router();


route.get('/',async (req, res) => {

    const ens = await Enseignant.find();
    res.send(ens);
})

route.get('/:id',async (req, res) => {
    let id = req.params.id;
    const ens = await Enseignant.findById(id);
    // console.log(id);
    // let course =courses.find((course) => course.id === id);

    res.send(ens);
})

route.post('/',async (req, res) => {
   
      let ens = new Enseignant();

     
      ens.userName = req.body.userName;
      var salt = bcrypt.genSaltSync(10);
      let password = await bcrypt.hashSync(req.body.password,salt);
      ens.password = password;
      let result = await ens.save();

    res.send(result)
})


route.post('/login', async (req, res) => {
   
     
    enseignant = {
        userName: req.body.userName,
        password: req.body.password
    }

    let ens = await Enseignant.findOne({ userName: enseignant.userName });

    if(ens) {
      bcrypt.compare(ens.password, enseignant.password, val => {
          if(!val) {
              return res.status(400).json({status: 0})
          }
          let token = jwt.sign({id: ens._id}, 'Administrateur')
          res.status(201).json({status: 1, token: token})
      })
         
    }else {
        res.status(400).send('user not found');
    }


})



route.delete('/:id',async (req, res) => {
    
    let id = req.params.id;
    
    let result = await Enseignant.deleteOne({_id: id})
    res.send(result);

})


module.exports = route;