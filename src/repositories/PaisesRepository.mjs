import paises from '../models/paises.mjs';
import IRepository from './IRepository.mjs';
import axios from 'axios';

class PaisesRepository extends IRepository{
    
    async obtenerTodos(){
        return await paises.find({});
    }

     async obtenerPorId(id) {
        return await paises.findById(id); // Ajusta esto según tu ORM
    }

     async actualizar(id, paisData) {
       return await paises.findByIdAndUpdate(id, paisData, { new: true });
    }

    async eliminar(id){
        return await paises.findByIdAndDelete(id);
    }

    async obtenerPorCreador(nombreCreador) {
        // Filtra los países donde el campo 'creator' coincida con 'nombreCreador'
        // Y ademas que el campo population exista, esto es para traer solo paises y NO superheroes
        // console.log(nombreCreador)
        return await paises.find({ creador: nombreCreador, population: { $exists: true } });
    }

    async importCountries() {
        try {

            const paises1 = true;
            const response = await axios.get('https://restcountries.com/v3.1/all');
            const allCountries = response.data;

            // Filtrar países con idioma español
            const spanishSpeakingCountries = allCountries.filter(country =>
                country.languages && country.languages.spa // Verifica si "languages" incluye "spa"
            );

            //opcion 2
            // Filtra los países que tienen el idioma español
            /* const spanishSpeakingCountries = allCountries.filter(country => {
                 return country.languages && Object.values(country.languages).includes('Spanish');
             });*/

            // Mapear los datos a nuestro esquema 
            // Mapea los datos filtrados al formato del modelo
            const countries = spanishSpeakingCountries.map(country => ({
                name: country.name,
                independent: country.independent || false,
                status: country.status,
                unMember: country.unMember,
                currencies: country.currencies,
                capital: country.capital || [],
                region: country.region,
                subregion: country.subregion,
                languages: country.languages,
                latlng: country.latlng || [],
                landlocked: country.landlocked,
                borders: country.borders || [],
                area: country.area,
                flag: country.flag,
                maps: country.maps,
                population: country.population,
                gini: country.gini,
                fifa: country.fifa,
                timezones: country.timezones || [],
                continents: country.continents || [],
                flags: country.flags,
                startOfWeek: country.startOfWeek,
                capitalInfo: country.capitalInfo,
                creador: 'Walter',
            }));

            await paises.insertMany(countries);
            console.log('Países importados correctamente');
            return paises1;
        } catch (error) {
            const paises1 = false;
            console.error('Error al importar países:', error);
            return paises1;
        }
    }
}

export default new PaisesRepository(); 