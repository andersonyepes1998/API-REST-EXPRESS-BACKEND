import express from "express";
import { login, register } from '../controllers/auth.controller.js';
import { body } from 'express-validator'
import { validationResulExpress } from "../middlewares/validationResulExpress.js";
//Este es un  middleware
const router = express.Router();

router.post(
    '/register', 
        [
            body('email', 'Formato de Email incorrecto')
                .trim()
                .isEmail()
                .normalizeEmail(),
            body('password', 'Minimo de 56 Caracteres...')
                .trim()
                .isLength({ min: 6 }),
            body('password', 'Formato de Password incorrecto')
                .custom((value, {req}) => {
                    if(value !== req.body.repassword){
                        throw new Error('Las contraseñas no coinciden ')
                    }
                    return value;
                })
        ], 
    validationResulExpress,
    register
);

router.post(
    '/login', 
        [
            body('email', 'Formato de Email incorrecto')
            .trim()
            .isEmail()
            .normalizeEmail(),
        body('password', 'Minimo de 6 Caracteres...')
            .trim()
            .isLength({ min: 6 }),
        ],
    validationResulExpress,
    login
);

export default router;