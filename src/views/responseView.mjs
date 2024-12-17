
export function renderizarPais(pais){
    //Filtrar las propiedades no deseadas
    const { translations, tld, cca2, ccn3, cca3, cioc, idd, altSpellings, car, coatOfArms, postalCode, demonyms, ...resto } = pais;

    //Agregar la nueva propiedad "creador"
   /* const paisConCreador = {
        ...resto,
        creador: "Tomás Barros"//"Jorge Valeri"
    };*/

    return{
        name: {
            common: pais.name.common,
            official: pais.name.official,
            nativeName: pais.name.nativeName
        },
        independent: pais.independent,
        status: pais.status,
        unMember: pais.unMember,
        currencies: pais.currencies,
        capital: pais.capital ? pais.capital[0] : "No disponible",
        region: pais.region,
        subregion: pais.subregion,
        languages: pais.languages ? Object.values(pais.languages).join(", ") : "No disponible",
        latlng: pais.latlng,
        landlocked: pais.landlocked,
        borders: pais.borders,
        area: pais.area,
        flag: pais.flag,
        maps: pais.maps,
        population: pais.population,
        gini: pais.gini,
        fifa: pais.fifa,
        timezones: pais.timezones,
        continents: pais.continents,
        flags: {
            png: pais.flags.png,
            svg: pais.flags.svg,
            alt: pais.flags.alt
        },
        startOfWeek: pais.startOfWeek,
        capitalInfo: pais.capitalInfo,
        creador: pais.creador
    };
}

export function renderizarListaPaises(paisesController) {
    return paisesController.map(pais => renderizarPais(pais));
}