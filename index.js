import * as dotenv from 'dotenv' 
import './dataBase/connectdb.js';
import express from 'express';
import authRoute from './routes/auth.route.js' 
import cookieParser from 'cookie-parser';
import linkRouter from './routes/link.rote.js';
const app = express();
dotenv.config()

//middleware son los que se esta usando con el USE, adional este middleware esta habilitando para que se pueda leer el JSON
app.use(express.json());
app.use(cookieParser());
app.use('/auth/', authRoute);
app.use('/links/', linkRouter);

// solo para el ejemplo del login/token, lo demas no es necesario
app.use(express.static('public'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`Servidor andando aqui, http://localhost:${PORT}`);
});