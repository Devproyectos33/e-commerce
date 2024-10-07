const express = require('express');
const ProductsServices = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {createProductSchema,updateProductSchema,getProductSchema} = require('./../schemas/product.schema');


const router = express.Router();  // se genera un router
const service = new ProductsServices();

router.get('/',async (req,res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/filter',(req,res)=>{
  res.send('yo soy un filter');
});

router.get('/:id',
  validatorHandler(getProductSchema,'params'),  // es un validador
  async (req,res,next) => {   /// forma como crear un GET (Leer)
  // //const a = req.params.id;  forma vieja de declarar
    try {
      const {id} = req.params;  // nueva forma desde ecmascript6
      const products = await service.findOne(id);
      res.json(products);
    } catch (error) {
        next(error);
    }
});

router.post('/',
  validatorHandler(createProductSchema,'body'),  // es un validador
  async (req,res) => {  // forma como crea un metodo POST  (crear)
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id',
  validatorHandler(getProductSchema,'params'),  // es un validador
  validatorHandler(updateProductSchema,'body'),  // es un validador
  async (req,res,next) => {   // forma como crea un metodo PATCH (actualizar)
  try {
    const {id} = req.params;
    const body = req.body;
    const product = await service.update(id,body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',async (req,res) => {   // forma como crea un metodo DELETE (eliminar)
  try {
    const {id} = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

module.exports = router;  // se usa para exportar el modulo a otro archivo


