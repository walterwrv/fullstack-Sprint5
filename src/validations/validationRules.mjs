    import mongoose from 'mongoose';
    import { body, param } from 'express-validator';
   

    function validarObjectId(id) {
        return mongoose.Types.ObjectId.isValid(id);
    }

    // Reglas para crear un superhéroe
    export const insertarPaisValidationRules = () => {
       
        return [
        // Validación para pais
        body('official')
            .trim()//limpia espacios en blanco al principio y/o al final del nombre
            .notEmpty().withMessage('El nombre del pais es requerido')
            .isLength({ min: 3, max: 90 }).withMessage('El nombre del pais debe tener entre 3 y 90 caracteres'),
    
        // Validación para capital
        body('capital')
            .trim()
            .notEmpty().withMessage('El nombre de la capital es requerido')
            .isLength({ min: 3, max: 90 }).withMessage('la capital debe tener entre 3 y 90 caracteres'),

        body('area')
            .isFloat({ gt: 0 }).withMessage('El campo "area" debe ser un número positivo.'),

        body('population')
            .isInt({ gt: 0 }).withMessage('El campo "población" debe ser un número entero positivo.'),

        body('gini')
            .isFloat({ min: 0, max: 100 }).withMessage('El campo "Indice Gini" debe ser un número entre 0 y 100.'),
        
        body('borders')
            .isArray({ min: 1 }) // Verifica que sea un array no vacío
            .withMessage('El campo borders debe ser un array no vacío')
            .custom((borders) => {
            // Verifica que cada elemento sea una cadena de 3 letras mayúsculas
            for (const border of borders) {
                if (typeof border !== 'string' || !/^[A-Z]{3}$/.test(border)) {
                throw new Error('Cada elemento de borders debe ser una cadena de 3 letras mayúsculas');
                }
            }
            return true; // Si pasa todas las validaciones
            }),
        
        ];
    };


    // Reglas para actualizar un superhéroe
    export const actualizarPaiseValidationRules = () => {
        // console.log('estoy en actualizarSuperheroeValidationRules');
        return [
            // Validación para pais
            body('official')
                .trim()//limpia espacios en blanco al principio y/o al final del nombre
                .notEmpty().withMessage('El nombre del pais es requerido')
                .isLength({ min: 3, max: 90 }).withMessage('El nombre del pais debe tener entre 3 y 90 caracteres'),
        
            // Validación para capital
            body('capital')
                .trim()
                .notEmpty().withMessage('El nombre de la capital es requerido')
                .isLength({ min: 3, max: 90 }).withMessage('la capital debe tener entre 3 y 90 caracteres'),
    
            body('area')
                .isFloat({ gt: 0 }).withMessage('El campo "area" debe ser un número positivo.'),
    
            body('population')
                .isInt({ gt: 0 }).withMessage('El campo "población" debe ser un número entero positivo.'),
    
            body('gini')
                .isFloat({ min: 0, max: 100 }).withMessage('El campo "Indice Gini" debe ser un número entre 0 y 100.'),
            
            body('borders')
                .isArray({ min: 1 }) // Verifica que sea un array no vacío
                .withMessage('El campo borders debe ser un array no vacío')
                .custom((borders) => {
                // Verifica que cada elemento sea una cadena de 3 letras mayúsculas
                for (const border of borders) {
                    if (typeof border !== 'string' || !/^[A-Z]{3}$/.test(border)) {
                    throw new Error('Cada elemento de borders debe ser una cadena de 3 letras mayúsculas');
                    }
                }
                return true; // Si pasa todas las validaciones
                }),
            
            ];
    };

    export const preprocesarDatos = (req, res, next) => {
        if (req.body.borders && typeof req.body.borders === 'string') {
            // Transforma el string en un array, eliminando espacios adicionales
            req.body.borders = req.body.borders.split(',').map(border => border.trim());
        } else {
            // Si no existe el campo, lo inicializa como un array vacío
            req.body.borders = [];
        }

        
        next();
    };
    

