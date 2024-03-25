import {Schema, model} from "mongoose";

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        trim: true, //  Esto elimina los espacios en blanco al principio y al final del valor del campo 
        unique: true, // para que sea unica y no puedan haber dos usuarios con el mimos correo
        lowercase: true, //Esto convierte automáticamente el valor del campo email en minúsculas.
        index: { unique: true } // Esto crea un índice único en el campo email, lo que mejora la eficiencia de las consultas y garantiza que no haya duplicados en el campo.
    },
    password:{
        type: String,
        required: true
    },
})

export const User = model('user', userSchema)