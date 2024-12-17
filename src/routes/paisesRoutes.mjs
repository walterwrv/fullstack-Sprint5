import express from 'express';
import { } from '../controllers/paisesController.mjs';
import PaisesRepository from '../repositories/PaisesRepository.mjs';

const router = express.Router();

// Ruta para la vista del Dashboard
router.get('/', async (req, res) => {
   // const paises = await PaisesRepository.obtenerTodos();
    const nameCreador = "Tomas Barros"
    const filtrado = await PaisesRepository.obtenerPorCreador(nameCreador)
    console.log(filtrado)
    res.render('dashboardPaises', { filtrado });
});




export default router;