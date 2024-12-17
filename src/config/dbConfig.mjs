import mongoose from 'mongoose'; // Importa la biblioteca Mongoose para interactuar con MongoDB.

// Define una función asíncrona para conectar a la base de datos MongoDB.
export async function connectDB() {
    try {
        // Intenta establecer una conexión con MongoDB utilizando la cadena de conexión proporcionada.
        await mongoose.connect(
            'mongodb+srv://Grupo-16:grupo16@cursadanodejs.ls9ii.mongodb.net/Node-js', {
            useNewUrlParser: true,       // Utiliza el nuevo analizador de URL (evita advertencias).
            useUnifiedTopology: true     // Activa el nuevo motor de administración de conexiones de MongoDB.
        });

        // Muestra un mensaje en la consola si la conexión es exitosa.
        console.log('Conexión exitosa a MongoDB');
    } catch (error) {
        // Captura errores en caso de que la conexión falle.
        console.error('Error al conectar a MongoDB:', error);
        // Finaliza el proceso de Node.js con un código de error.
        process.exit(1);
    }
}