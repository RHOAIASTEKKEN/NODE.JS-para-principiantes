const express = require('express');
const path = require('path');
const app = express();

// Middleware para procesar datos enviados en el cuerpo de la petición
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Para servir archivos estáticos

// Ruta GET - Página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta POST - Procesar la división
app.post('/dividir', (req, res) => {
    const numeros = req.body.numeros.split(',').map(Number); // Convertir a números
    const divisor = Number(req.body.divisor);
    let resultados = [];

    try {
        resultados = dividirLista(numeros, divisor);
        res.json({ resultados });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Función para dividir todos los números de una lista por un número dado
function dividirLista(numeros, divisor) {
    let resultados = [];

    if (divisor === 0) {
        throw new Error('¡No puedes dividir entre cero!');
    }

    for (let i = 0; i < numeros.length; i++) {
        if (numeros[i] < 0) {
            throw new Error('¡No se permiten números negativos!');
        }
        resultados.push(numeros[i] / divisor);
    }

    return resultados;
}

// El servidor escucha en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});
