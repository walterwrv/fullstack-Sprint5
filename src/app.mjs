import express from 'express'; // Framework para crear servidores y manejar rutas.
import { connectDB } from './config/dbConfig.mjs'; // Función personalizada para conectar a la base de datos.
import paisRoutes from './routes/paisesRoutes.mjs'; // Rutas para manejar vistas relacionadas con "países".
import routerApi from './routes/paisesRoutesApi.mjs'; // Rutas para manejar la API de "países".
import expressEjsLayouts from 'express-ejs-layouts'; // Middleware para usar layouts con el motor de plantillas EJS.
import path from 'path'; // Módulo para trabajar con rutas de archivos y directorios.
import { fileURLToPath } from 'url'; // Herramienta para obtener el nombre del archivo actual en módulos ES.



const app = express(); // Crear la aplicación de Express.
const PORT = process.env.PORT || 3000; // Definir el puerto desde las variables de entorno, con un valor predeterminado de 3000.

app.use(express.urlencoded({ extended: true })); // Analiza datos de formularios enviados con POST en formato `application/x-www-form-urlencoded`.
app.use(express.json()); // Permite analizar y manejar solicitudes con datos en formato JSON.
connectDB(); // Llama a la función para conectar con la base de datos (asegúrate de configurarla en `dbConfig.mjs`).

const __filename = fileURLToPath(import.meta.url); // Obtiene el nombre del archivo actual (con ES Modules no se tiene acceso a `__filename` por defecto).
const __dirname = path.dirname(__filename); // Obtiene el directorio que contiene este archivo.


// Define la carpeta donde estarán las vistas (archivos EJS).
app.set('views', path.join(__dirname, 'views'));

// Configura el motor de plantillas EJS para renderizar vistas dinámicas.
app.set('view engine', 'ejs');

// Usa `express-ejs-layouts` para habilitar layouts en las vistas.
app.use(expressEjsLayouts);
app.set('layout', 'layout'); // Establece un archivo base de layout (`views/layout.ejs`).

// Sirve archivos estáticos desde la carpeta "public" (CSS, imágenes, JavaScript del cliente, etc.).
app.use(express.static(path.resolve('./public')));


// Rutas para manejar endpoints de la API de países (generalmente devuelven datos JSON).
app.use('/api', routerApi);


// Rutas relacionadas con vistas y renderización de páginas (por ejemplo, un dashboard de países).
app.use('/', paisRoutes);


// Middleware para manejar rutas no encontradas.
// Si ninguna de las rutas anteriores coincide, devolverá un mensaje con el error 404.
app.use((req, res) => { 
    res.status(404).send({ mensaje: "Ruta no encontrada" });
});


app.listen(PORT, () => { 
    // Mensaje en la consola para confirmar que el servidor está funcionando.
    console.log(`Servidor levantado en el puerto: ${PORT}, desde el servidor`);
});
