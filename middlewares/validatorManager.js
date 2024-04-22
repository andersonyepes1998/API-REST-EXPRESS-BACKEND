import axios from "axios";
import { validationResult, body, param } from "express-validator";

export const validationResulExpress = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
}

export const paramLinkValidator = [
    param('id', 'Formato no valido (expressValidator)')
        .trim()
        .notEmpty()
        .escape(),
    validationResulExpress
] 

export const bodyLinkValidator = [
    body('longLink', 'Formato Link Incorrecto')
        .trim()
        .notEmpty()
        .custom(async value => {
            try {
                //AQUI LO QUE ESTOY HACIENDO ES QUE ES VALIDANDO QUE SIII SEA UN LINK DE UNA URL...
                if(!value.startsWith ('https://')){
                    value = 'https://' + value
                }
                await axios.get(value);
                console.log(value);

                return value
            } catch (error) {
                //console.log(error);
                throw new Error('Not Found longLink 404');
            }
        })
        
        ,
    validationResulExpress
]

export const bodyRegisterValidator = 
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
            }
        ),
        validationResulExpress
    ]

export const bodyLoginValidator = 
    [
        body('email', 'Formato de Email incorrecto')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', 'Minimo de 6 Caracteres...')
        .trim()
        .isLength({ min: 6 }),
        validationResulExpress
    ]
