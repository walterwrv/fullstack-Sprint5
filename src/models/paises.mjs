import mongoose from 'mongoose';

const paisSchema = new mongoose.Schema({
    name: {
        common: { type: String, required: false },
        official: { type: String, required: true },
        nativeName: {
            type: Object,
            required: false,
        },
    },
    independent: { type: Boolean, required: false },
    status: { type: String, required: false },
    unMember: { type: Boolean, required: false },
    currencies: { type: Object, required: false },
    capital: [String],
    region: { type: String, required: false },
    subregion: { type: String, required: false },
    languages: { type: Object, required: false },
    latlng: [Number],
    landlocked: { type: Boolean, required: false },
    borders: [String],
    area: { type: Number, required: true },
    flag: { type: String, required: false },
    maps: {
        googleMaps: { type: String, required: false },
        openStreetMaps: { type: String, required: false }
    },
    population: { type: Number, required: false },
    gini: { type: Object },
    fifa: { type: String },
    timezones: [String],
    continents: [String],
    flags: {
        png: { type: String, required: false },
        svg: { type: String, required: false },
        alt: { type: String }
    },
    startOfWeek: { type: String, required: false },
    capitalInfo: {
        latlng: [Number]
    },
    creador: { type: String, required: true }
}, { collection: 'Grupo-16' });

export default mongoose.model('Pais', paisSchema);