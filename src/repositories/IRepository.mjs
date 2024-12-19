class IRepository{
    
    obtenerTodos(){
        throw new Error("Metodo 'obtenerTodos()' no implementado")
    }

    importCountries(){
        throw new Error('Metodo importCountries() no implementado');
    }
}

export default IRepository; //Exporto la clase

