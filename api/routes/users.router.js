const express = require('express');
const UsersServices = require('./../services/users.services');

const routerUsuario = express.Router();  // se genera un router
const service = new UsersServices();

routerUsuario.get('/',async (req,res)=>{
  const users = await service.find();
  res.json(users);
})

routerUsuario.get('/usuario',(req,res)=>{
  res.send('hola soy un nuevo usuario');
})

routerUsuario.get('/:id',async (req,res) => {
  const {id} = req.params;
  const users = await service.findOne(id);
  res.json(users);
});

routerUsuario.post('/',async (req,res) => {
  const body = req.body;
  const newUser = await service.create(body);
  res.status(201).json(newUser);
});

routerUsuario.patch('/:id',async (req,res) => {
  try {
    const {id} = req.params;
    const body = req.body;
    const user = await service.update(id,body);
    res.json(user);
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }

});

routerUsuario.delete('/:id',async (req,res) => {
  const{id} = req.params;
  const rta = await service.delete(id)
  res.json(rta);
});

module.exports = routerUsuario;  // se usa para exportar el modulo a otro archivo
