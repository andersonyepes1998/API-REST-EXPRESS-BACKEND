import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
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

userSchema.pre('save', async function(next){
    const user = this

    if(!user.isModified('password'))return next()

    try {
        const salt = await bcryptjs.genSalt(10)
        user.password = await bcryptjs.hash(user.password, salt)
        next()
    } catch (error) {
        console.log(error.code);
        throw new Error('Fallo el hash de contraseña')
    }
})

userSchema.methods.comparePassword = async function(candidatePassword){
    //EN ESTE MOMENTO ESTAMOS HACEDIENDO A LA CONTRASEÑA QUE HAY EN LA BASE DE DATOS
    return await bcryptjs.compare(candidatePassword, this.password)
}

export const User = mongoose.model('User', userSchema)