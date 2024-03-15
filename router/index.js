const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 80;

// Configurar middleware para procesar datos del formulario
app.use(bodyParser.urlencoded({ extended: false }));

// Ruta para manejar la solicitud de generación de recibo de pago
app.post('/generar_recibo', (req, res) => {
  const { numDocente, nombre, domicilio, nivel, pagoBase, horasImpartidas, cantidadHijos } = req.body;

  
  let pagoBasePorHora = parseFloat(pagoBase);
  if (nivel === '1') {
    pagoBasePorHora *= 1.3; // Incremento del 30% para nivel 1
  } else if (nivel === '2') {
    pagoBasePorHora *= 1.5; // Incremento del 50% para nivel 2
  } else if (nivel === '3') {
    pagoBasePorHora *= 2; // Incremento del 100% para nivel 3
  }

  // Calcular el pago total
  const pagoTotal = pagoBasePorHora * parseFloat(horasImpartidas);

  // Calcular el impuesto
  const impuesto = pagoTotal * 0.16;

  // Calcular el bono por paternidad
  let bonoPaternidad = 0;
  if (cantidadHijos >= 1 && cantidadHijos <= 2) {
    bonoPaternidad = pagoTotal * 0.05;
  } else if (cantidadHijos >= 3 && cantidadHijos <= 5) {
    bonoPaternidad = pagoTotal * 0.1;
  } else if (cantidadHijos > 5) {
    bonoPaternidad = pagoTotal * 0.2;
  }

  // Calcular el recibo de pago
  const recibo = {
    numDocente,
    nombre,
    domicilio,
    nivel,
    pagoBase: parseFloat(pagoBase),
    horasImpartidas: parseFloat(horasImpartidas),
    cantidadHijos: parseInt(cantidadHijos),
    pagoTotal: pagoTotal.toFixed(2),
    impuesto: impuesto.toFixed(2),
    bonoPaternidad: bonoPaternidad.toFixed(2)
  };

  // Renderizar la plantilla del recibo de pago con los datos calculados
  res.render('recibo_pago', { recibo });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
