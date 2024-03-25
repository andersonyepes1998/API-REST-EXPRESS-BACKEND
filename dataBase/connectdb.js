import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.URIMONGO);
    console.log('connect DB ok ');

} catch (e) {
    console.log('Error en la conexcion: ', e);
}
