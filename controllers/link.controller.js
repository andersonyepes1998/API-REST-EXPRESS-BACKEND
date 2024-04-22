import { nanoid } from "nanoid/non-secure";
import { Link } from "../models/Link.js";

export const getLinks = async (req, res) => {
    try {

        const links = await Link.find({uid: req.uid})

        return res.json({links});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Error del servidor' });
    }
}

export const getLinkId = async (req, res) => {
    try {
        const {id} = req.params
        const link = await Link.findById(id);
        console.log(link);

        if(!link) return res.status(404).json({error: 'No existe el link'});

        if(!link.uid.equals(req.uid)) return res.status(404).json({error: 'No le pertenece ese ID 🧓'});

        return res.json({link});
    } catch (error) {
        console.log(error);
        if(error.kind === 'ObjectId'){
            return res.status(403).json({error: 'Formato de Id incorrecto'});
        }
        return res.status(500).json({error: 'Error del servidor' });
    }
}

export const createLinks = async (req, res) => {
    try {
        let {longLink} = req.body;
        if(!longLink.startsWith ('https://')){
            longLink = 'https://' + longLink
        }
        console.log(longLink);
        const link = new Link({longLink, nanoLink: nanoid(6), uid: req.uid}); 
        console.log(link);

        const newLink = await link.save();

        return res.status(201).json({ newLink });
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Error del servidor' });
    }
}

export const removeLinkId = async (req, res) => {
    try {
        const {id} = req.params
        console.log(id);
        const link = await Link.findById(id);
        console.log(link);

        if(!link) return res.status(404).json({error: 'No existe el link'});

        if(!link.uid.equals(req.uid)) return res.status(404).json({error: 'No le pertenece ese ID 🧓'});

        await link.deleteOne();

        return res.json({link});
    } catch (error) {
        console.log(error);
        if(error.kind === 'ObjectId'){
            return res.status(403).json({error: 'Formato de Id incorrecto'});
        }
        return res.status(500).json({error: 'Error del servidor' });
    }
}