
import express from 'express';

import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import path from 'path';

import myRoutes from './router/index.js'

const puerto = 80;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Crear la aplicación Express
const main = express();
main.set('view engine', 'ejs');
main.set(express.static( `${__dirname}/public` ) );
main.use(bodyParser.urlencoded({extended:true}));
main.use(myRoutes.router);

main.listen(puerto, () => {
  console.log(`Servidor corriendo en http://localhost:${puerto}`);
});
