// src/validations/errorMiddleware.js
import { validationResult } from 'express-validator';
import PaisesRepository from '../repositories/PaisesRepository.mjs';


export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    
    const datosPais = {...req.body,
      borders: req.body.borders.join(',') //tranformo de array a string
    }; 
    // console.log('poderes ', typeof datosHeroe.poderes);
    return res.status(400).render('agregarPais', {
        errors: errors.array(),
        datosPais,
        title: 'agregar pais',
    });
  }
  next();
};

export const handleValidationErrorsEditar =  async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {

    const {id} = req.params;
    const datosPaisId = await PaisesRepository.obtenerPorId(id);
    
    const datosPais = {...req.body,
      _id : datosPaisId._id,
      borders: req.body.borders.join(',') //tranformo de array a string
    }; 
    console.log('datosPais ', datosPais._id);
    return res.status(400).render('editarPais', {
        errors: errors.array(),
        datosPais,
        title: 'editar pais',
    });
  }
  next();
};