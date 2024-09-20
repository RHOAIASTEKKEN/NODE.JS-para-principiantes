const express = require('express');
const path = require('path');
const app = express();

// Middleware para procesar datos enviados en el cuerpo de la petición
app.use(express.urlencoded({ extended: true }));

// Ruta GET - Página principal (sirve el archivo HTML)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta POST - Cuando envías información desde el formulario POST
app.post('/enviar', (req, res) => {
    const nombre = req.body.nombre;
    res.send(`¡Has enviado información con POST! Hola, ${nombre}!`);
});

// Ruta GET - Cuando envías información desde el formulario GET
app.get('/enviar', (req, res) => {
    const nombre = req.query.nombre;
    res.send(`¡Has enviado información con GET! Hola, ${nombre}!`);
});

// El servidor escucha en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});
