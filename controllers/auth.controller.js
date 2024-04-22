import {User} from '../models/user.js'
import { 
        generateRefreshToken, 
        generateToken,  } 
        from '../utils/tokenManager.js';


export const register = async (req, res) => {
    const {email, password} = req.body;
    try {
        // alternativa buscandon con un email
        let user = await User.findOne({email:email})
        //Cuado trabajamos con el try y con el catch, el throw hace que salte de inmediato al catch, por ende se podria haber puesto aqui el codigo de la 21
        if(user) throw ({code: 11000});

        user = new User({email:email, password:password});
        await user.save();

        //jwt token 

        const {token, expiresIn} = generateToken(user.id);
        generateRefreshToken(user.id, res)

        return res.status(201).json({token, expiresIn});
    } catch (error) {
        console.log(error);
        //alternativo por defeacto mongoose
        if(error.code === 11000){
            return res.status(400).json({error: 'El correo ya existe'})
        }
        return res.status(500).json({error: 'Error en el servidor'})
    }
}

export const login = async(req, res) => {
    const {email, password} = req.body;

    try {
        let user = await User.findOne({email:email})
        if(!user) return res.status(404).json({ error: 'El usuario no extiste en la base de datos'})

        const resultPassword = await user.comparePassword(password);
        if(!resultPassword){
            return res.status(404).json({ error: 'Contraseña incorrecta'})
        }

        //generar el token JWT

        const {token, expiresIn} = generateToken(user.id);
        generateRefreshToken(user.id, res)

        res.json({ token, expiresIn })
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Error en el servidor'})
    }
}

export const infoUser = async (req, res) => {
    try {
        const user = await User.findById(req.uid).lean();
        return res.json({ email: user.email, uid: user.id})
    } catch (error) {
        return res.status(500).json({ error: 'Error del serve' });
    }
}

export const refreshToken = (req, res) => {
    try {
        const { token, expiresIn } = generateToken(req.uid);
        return res.json({token, expiresIn})

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error del serve' });
    }
}

export const logout = (req, res) => {
    res.clearCookies('token');
    res.json({ok: true});
};