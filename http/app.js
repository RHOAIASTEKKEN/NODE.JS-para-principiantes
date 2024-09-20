const http = require('http');
const server = http.createServer((req, res) => {
    res.write('Hola, bienvenido a mi servidor');
    res.end();
})

server.listen(3000, () => {
    console.log("La puerta esta abierta ingresa por http://localhost:3000")
})