const express = require('express');
const CategoriaServices = require('./../services/categories.services');

const routerCategories = express.Router();  // se genera un router
const service = new CategoriaServices();

routerCategories.get('/',async (req,res)=>{
  const categories = await service.find();
  res.json(categories);
})

routerCategories.get('/categoria',(req,res)=>{
  res.send('hola soy un nuevo usuario');
})

routerCategories.get('/:id',async(req,res) => {
  const {id} = req.params;
  const categories = await service.findOne(id);
  res.json(categories);
});

routerCategories.post('/',async(req,res) => {
  const body = req.body;
  const newCategories = await service.create(body);
  res.status(201).json(newCategories);
});

routerCategories.patch('/:id',async (req,res) => {
  try {
    const {id} = req.params;
    const body = req.body;
    const categorie = await service.update(id,body);
    res.json(categorie);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

routerCategories.delete('/:id',async (req,res) => {
  const{id} = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

module.exports = routerCategories;  // se usa para exportar el modulo a otro archivo
