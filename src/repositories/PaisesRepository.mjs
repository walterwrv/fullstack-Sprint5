import paises from '../models/paises.mjs';
import IRepository from './IRepository.mjs';

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
        // console.log(nombreCreador)
        return await paises.find({ creador: nombreCreador });
    }
}

export default new PaisesRepository(); 