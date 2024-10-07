const express = require('express');
const cors = require('cors');
const routerApi = require('./routes')   // se importa lo que esta en la carpeta routes
const {logErrors,errorHandler,boomErrorHandler} = require('./middlewares/error.handler')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //  middleware para ejecutar el post de Json}

//const whitelist = ['http:localhost:8080','http://myapp.co']

const whitelist = ["http://127.0.0.1:5500", "https://myapp.com"];

const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback( null, true);
    } else {
      callback(new Error ('No tiene permiso para acceder'));
    }
  }
}

app.use(cors(options));

app.get('/',(req,res) => {    // asignando una ruta desde la raiz
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta',(req,res) => {    // asignando una nueva ruta desde la raiz
  res.send('Hola soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port,() => {
  console.log('Mi port ' + port);
});

