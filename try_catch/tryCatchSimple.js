// Esta es una función que se encarga de dividir dos números
// Si intentamos dividir por cero, no se puede, así que lanzamos un "error"
function dividir(a, b) {
    // Si el segundo número (b) es igual a 0, no se puede dividir
    if (b === 0) {
        // Lanzamos un error diciendo que no se puede dividir entre cero
        throw new Error('No se puede dividir entre cero');
    }
    // Si todo está bien, devolvemos el resultado de la división
    return a / b;
}

// Ahora, vamos a intentar dividir usando la función "dividir"
try {
    // Intentamos dividir 10 entre 0, pero esto causará un error
    const resultado = dividir(10, 0);
    // Si no hay error, mostramos el resultado en la consola
    console.log(resultado);
} catch (error) {
    // Si hay un error (como dividir entre cero), atrapamos el error aquí
    // Mostramos un mensaje diciendo "¡Error encontrado!" y el detalle del error
    console.error('¡Error encontrado!', error.message);
}