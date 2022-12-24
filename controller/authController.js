import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors/index.js';

const register = async ( req, res ) => {
    const { name, email, password, lastname, location } = req.body;
    if ( !name || !email || !password || !lastname ) {
        throw new BadRequestError( 'Please provide all the values' )
    }

    const userAlreadyExist = await User.findOne( { email } );
    if ( userAlreadyExist ) {
        throw new BadRequestError( 'User already exist' )
    }
    const user = await User.create( { name, email, password, lastname, location } )
    const token = user.createJWT();
    res.status( StatusCodes.CREATED ).json( { user: { email: user.email, name: user.name, lastname: user.lastname, location: user.location }, token, location: user.location } )
}
const login = async ( req, res ) => {
    res.send( 'Login User' )
}
const updateUser = async ( req, res ) => {
    res.send( 'Update User' )
}
export { register, login, updateUser }