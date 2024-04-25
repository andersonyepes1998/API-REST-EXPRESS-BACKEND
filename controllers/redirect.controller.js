import { Link } from "../models/Link.js";

// OJO ESTE CODIGO ES SOLO PARA VISITAR LA RUTA RAIZ PERO DESDE EL BACKEND
export const redirectLink =  async (req, res) => {
    try {
        const {nanoLink} = req.params
        const link = await Link.findOne({nanoLink});
        console.log(link);

        if(!link) return res.status(404).json({error: 'No existe el link'});

        return res.redirect(link.longLink);
    } catch (error) {
        console.log(error);
        if(error.kind === 'ObjectId'){
            return res.status(403).json({error: 'Formato de Id incorrecto'});
        }
        return res.status(500).json({error: 'Error del servidor' });
    }
}