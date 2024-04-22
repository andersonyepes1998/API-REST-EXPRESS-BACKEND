import jwt from 'jsonwebtoken';
import { tokenVerificationsErrors } from '../utils/tokenManager.js';

export const requireToken = (req, res, next) => {
    try {
        
        let token = req.headers?.authorization
        
        if (!token) {
            throw new Error('No Bearer token');
        }

        token = token.split(' ')[1];

        //AQUI VERIFICAMOS SI EL TOKEN SI ESTA BIEN Y SI NO ESTA BIEN ES UNA PASAYASADA SE REVIENTA DE INMEDIATO
        const {uid} = jwt.verify(token, process.env.JWT_SECRET)
        //Con esta req.uid se lo puedo pasar del requireToken al auth.controller y poder acceder
        req.uid = uid
        
        next()
    } catch (error) {
        console.log(error);
        return res
            .status(401)
            .send({ error: tokenVerificationsErrors[error.message] });

        //return res.status(401).json({error: error.message});
    }
}