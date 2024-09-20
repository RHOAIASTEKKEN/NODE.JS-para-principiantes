// Importamos las librerías necesarias
const express = require('express'); // Express nos ayuda a crear un servidor
const fs = require('fs'); // FS nos permite trabajar con archivos
const path = require('path'); // Path nos ayuda a manejar rutas de archivos
const bodyParser = require('body-parser'); // Body-parser nos ayuda a leer datos de formularios

// Creamos una aplicación usando Express
const app = express();
const PORT = 3000; // Definimos el puerto donde escucharemos las peticiones

// Usamos body-parser para poder procesar los datos que llegan en el formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para servir el archivo HTML cuando alguien visita la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Enviamos el archivo index.html
});

// Ruta para agregar un nuevo usuario
app.post('/agregar', (req, res) => {
    // Extraemos el nombre y la edad que el usuario envió desde el formulario
    const { nombre, edad } = req.body;

    // Creamos un array vacío para guardar los usuarios
    let usuarios = [];

    // Si el archivo 'usuarios.json' ya existe, lo leemos
    if (fs.existsSync('usuarios.json')) {
        const datos = fs.readFileSync('usuarios.json', 'utf-8'); // Leemos los datos del archivo
        usuarios = JSON.parse(datos); // Convertimos los datos de texto a un objeto de JavaScript
    }

    // Agregamos el nuevo usuario a nuestra lista
    usuarios.push({ nombre, edad });

    // Guardamos la lista actualizada de usuarios en el archivo JSON
    fs.writeFileSync('usuarios.json', JSON.stringify(usuarios, null, 2)); // Convertimos el objeto de vuelta a texto y lo guardamos

    // Creamos un mensaje para mostrar todos los usuarios agregados
    let usuariosHTML = '<h2>Usuarios Agregados:</h2><ul>';
    usuarios.forEach(usuario => {
        // Por cada usuario, añadimos su nombre y edad a la lista
        usuariosHTML += `<li>Nombre: ${usuario.nombre}, Edad: ${usuario.edad}</li>`;
    });
    usuariosHTML += '</ul>'; // Cerramos la lista

    // Enviamos la lista de usuarios y un botón para seguir agregando
    res.send(`${usuariosHTML}<style> .btn-return {
            padding: 10px 15px;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            </style><form action="/"> <button class="btn-return">Seguir agregando</button> </form>`);
});

// Hacemos que el servidor escuche en el puerto definido
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`); // Mostramos un mensaje en la consola
});
