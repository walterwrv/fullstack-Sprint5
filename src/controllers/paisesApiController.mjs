import { obtenerPaises } from '../services/paisesServices.mjs';
import { renderizarListaPaises } from '../views/responseView.mjs';
import Pais from '../models/paises.mjs'; // Asegúrate de importar el modelo Pais
import PaisesRepository from '../repositories/PaisesRepository.mjs';

//agregar un nuevo país
export async function addPais(req, res) {
    console.log('Llegó hasta addPais'); // Confirmación básica en la consola del servidor.
    // Extraer los datos enviados desde el formulario (req.body contiene los datos enviados por POST).
    const { official, capital, area, population, gini, borders, timezones } = req.body;

    // Crear el objeto con el formato esperado para el modelo de la base de datos.
    const nuevoPais = {
        name: { official }, // "name" tiene una subclave "official".
        capital: [capital], // "capital" se guarda como un array, aunque en el formulario es un string.
        area, // Área (número).
        population, // Población (número).
        gini: gini ? { "0": parseFloat(gini) } : {}, // Convierte "gini" a un número flotante o lo deja vacío.
        borders, // Divide por comas y elimina espacios.
        timezones: timezones ? timezones.split(',').map(t => t.trim()) : [], // Similar a "borders".
        creador: "Tomas Barros" // Agrega un valor estático para el creador.
    };
    try {
        // Intentar guardar el nuevo país en la base de datos usando el modelo "Pais".
        await Pais.create(nuevoPais);
        // Redirigir al usuario a la página principal después de agregar el país.
        res.redirect('/');
    } catch (error) {
        // Manejar errores y responder con un mensaje adecuado.
        console.error('Error al agregar el país:', error);
        res.status(500).send('Hubo un problema al agregar el país.');
    }
}

//FUNCION PARA VER TODOS LOS PAISES DE LA API//
export async function cargarPaises(req, res) {
    try {
        const paises = await obtenerPaises(); 
        console.log(paises);
        // Guardar cada país en la base de datos
        for (const pais of paises) {
            // Verificar que el país tenga la propiedad 'subregion'
            if (!pais.subregion) {
                console.warn("El país no tiene subregión:", pais);
                continue; // O manejar esto de otra forma
            }
            const paisConCreador = {
                ...pais,
               // creador: "Jorge Valeri"  Añadiendo la propiedad "creador"
                creador: "Tomas Barros" // Añadiendo la propiedad "creador"
            };
            try {
                await Pais.create(paisConCreador); // Guarda el país en la base de datos
            } catch (dbError) {
                console.error("Error al guardar país:", paisConCreador, dbError);
            }
        }
        //filtrar por nombre de creador
        const paisesFiltrados= await PaisesRepository.obtenerPorCreador("Tomás Barros")
        res.send(paisesFiltrados)
       // res.send(renderizarListaPaises(paisesFiltrados));
    } catch (error) {
        console.error("Error al cargar países:", error);
        res.status(500).send("Error al cargar países");
    }
}

//FILTRO PARA VER LOS PAISES CON IDIOMA ESPAÑOL//
export async function paisesEspanol(req, res) {
    try {
        const paises = await obtenerPaises();
        const paisesConEspanol = paises.filter(pais => 
            pais.languages && pais.languages['spa']
        );

        res.send(renderizarListaPaises(paisesConEspanol));
    } catch (error) {
        console.error("Error al cargar países que hablan español:", error);
        res.status(500).send("Error al cargar países que hablan español");
    }
}



export async function renderPaisEditar(req, res) {
        const {id} = req.params;
        const datosPais1 = await PaisesRepository.obtenerPorId(id);
        const datosPais = {datosPais1,
            _id : datosPais1._id,
            official : datosPais1.name.official,
            capital : datosPais1.capital,
            area : datosPais1.area,
            population : datosPais1.population,
            gini : datosPais1.gini,
            borders : datosPais1.borders,
            timezones : datosPais1.timezones,
          }; 
        res.render('editarPais', {errors: [], datosPais, title: 'agregar superheroe' });
}

export async function editarPaises(req, res) {
        console.log("llego a editar post")
        const { official, capital, area, population, gini, borders, timezones } = req.body;
    
        const paisActualizado = {
            name: { official },
            capital: [capital],
            area,
            population,
            gini:  gini ,
            borders: borders,
            timezones: timezones ? timezones.split(',') : [],
        };
        const {id} = req.params;
      await PaisesRepository.actualizar(id, paisActualizado);
       res.redirect('/');
}

export async function eliminarPais (req, res){
    await PaisesRepository.eliminar(req.params.id);
    res.status(204).send(); // Responde con un estado 204 No Content
}