# Proyecto: Gestión de Países con Node.js, Express y MongoDB

## Objetivo del Proyecto
El objetivo de este proyecto es desarrollar una aplicación web que consuma datos de una API externa, procese la información para filtrar países de habla hispana y permita gestionar esta información (listar, agregar, editar y eliminar) en una base de datos MongoDB.

---

## Tecnologías Utilizadas
- **Node.js**: Plataforma para la ejecución del servidor.
- **Express**: Framework para el manejo de rutas y peticiones HTTP.
- **MongoDB**: Base de datos NoSQL para almacenar los datos procesados.
- **Mongoose**: ODM para definir esquemas y realizar operaciones en MongoDB.
- **Axios**: Biblioteca para realizar peticiones HTTP a la API externa.
- **EJS**: Motor de plantillas para renderizar vistas dinámicas.
- **Bootstrap**: Framework CSS para diseñar una interfaz amigable.

---

## Funcionalidades
1. **Consumo de API Externa**:
   - Obtención de datos de la API Rest Countries.
   - Procesamiento y filtrado de países hispanohablantes.
2. **Gestión de Países**:
   - **Listado**: Visualización de todos los países almacenados en una tabla interactiva.
   - **Agregar País**: Formulario para añadir nuevos países con validaciones en el frontend y backend.
   - **Editar País**: Modificación de la información existente.
   - **Eliminar País**: Eliminación de un país de la base de datos.
3. **Validaciones**:
   - Validaciones estrictas para garantizar la integridad de los datos.
   - Mensajes de error claros en caso de datos inválidos.

---

## Requisitos de Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone <URL-DEL-REPOSITORIO>
   cd <NOMBRE-DEL-PROYECTO>
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar la base de datos MongoDB**:
   - Asegúrate de tener MongoDB instalado y ejecutándose localmente.
   - Cambia la URL de conexión en el archivo `index.js` si es necesario:
     ```javascript
     mongoose.connect('mongodb://127.0.0.1:27017/countriesDB');
     ```

4. **Iniciar la aplicación**:
   ```bash
   npm start
   ```
   La aplicación estará disponible en: [http://localhost:3000](http://localhost:3000)

---

## Estructura del Proyecto
```
|-- public/            # Archivos estáticos (CSS, JS, imágenes)
|-- views/             # Vistas EJS (dashboard, add, edit)
|-- processed_countries.json  # Archivo JSON con los datos procesados
|-- index.js           # Código principal del proyecto
```

---

## Cómo Usar la Aplicación
1. Visita el dashboard principal: [http://localhost:3000](http://localhost:3000).
2. **Agregar País**:
   - Haz clic en el botón "Agregar País".
   - Completa el formulario y envíalo.
3. **Editar País**:
   - Haz clic en el botón "Editar" junto al país que deseas modificar.
   - Realiza los cambios y envía el formulario.
4. **Eliminar País**:
   - Haz clic en el botón "Eliminar" para borrar un país.

---

## Capturas de Pantalla
1. **Dashboard Principal**
   ![Dashboard](https://via.placeholder.com/800x400)

2. **Formulario de Agregar País**
   ![Agregar País](https://via.placeholder.com/800x400)

---

## Consideraciones Especiales
- **Validaciones**:
  - Las validaciones están activas tanto en el frontend como en el backend para garantizar la integridad de los datos.
  - Por ejemplo, el nombre oficial debe tener entre 3 y 90 caracteres, y las fronteras deben ser códigos de 3 letras mayúsculas.
- **Pruebas**:
  - Prueba ingresando datos inválidos para verificar que las validaciones funcionan correctamente.

---

## Próximos Pasos
- Añadir autenticación para limitar el acceso a ciertas funcionalidades.
- Mejorar el diseño del frontend utilizando componentes adicionales de Bootstrap.

---

## Créditos
- **Creador**: [Tu Nombre]