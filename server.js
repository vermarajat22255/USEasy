import express from 'express';
// Importing async-error-package catches the error automatically without try-catch
import 'express-async-errors'

// logging middleware
import morgan from 'morgan';

//db and authenticate
import connectDB from './db/connect.js';

// routers
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'

// middleware
import errorHandlerMiddleware from './middleware/error-handler.js';
import notFoundMiddleware from './middleware/not-found.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

// We use express.json() to access the json body parameters in the request
if ( process.env.NODE_ENV !== 'production' ) {
    app.use( morgan( 'dev' ) )
}
app.use( express.json() )
const port = process.env.PORT || 5000;

app.get( '/', ( req, res ) => {
    res.json( { 'msg': 'Welcome !' } );
} )

app.get( '/welcome', ( req, res ) => {
    res.json( { 'msg': 'Welcome !' } );
} )

app.use( '/api/v1/auth', authRouter );
app.use( '/api/v1/jobs', jobsRouter )
// first setup all the HTTP verbs middlewares are the fallbacks
app.use( notFoundMiddleware );
app.use( errorHandlerMiddleware );


const start = async () => {
    try {
        await connectDB( process.env.MONGO_URL ).then( client => {
            console.log( 'Connected to Database' )
        } )

    }
    catch ( error ) {
        console.log( error )
    }
}

app.listen( port, () => {
    start()
    console.log( " Server started on port", port )
} )
