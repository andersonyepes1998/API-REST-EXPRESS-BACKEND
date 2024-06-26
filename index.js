//Ojo no podemos llamar a la base datos sin antes hacer el llamado de la variables de entorno, que si no explotariaaaa
import * as dotenv from 'dotenv' 
import './dataBase/connectdb.js';
import express from 'express';
import authRoute from './routes/auth.route.js' 
import cookieParser from 'cookie-parser';
import linkRouter from './routes/link.rote.js';
import redirectRouter from './routes/redirect.router.js'
import cors from 'cors'

const app = express();
dotenv.config()

//middleware son los que se esta usando con el USE, adional este middleware esta habilitando para que se pueda leer el JSON
const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2]

app.use(cors({
    origin: function(origin, callback){
        if(whiteList.includes(origin)){
            return callback(null, origin);
        }
        return callback(
            'Error de Cors origin' + origin + ' No autorizado!' 
        );
    }
}));

app.use(express.json());
app.use(cookieParser());
//ejemplo back redirect (opcional)
app.use('/', redirectRouter);
app.use('/auth/', authRoute);
app.use('/links/', linkRouter);

// solo para el ejemplo del login/token, lo demas no es necesario
// app.use(express.static('public'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`Servidor andando aqui, http://localhost:${PORT}`);
});