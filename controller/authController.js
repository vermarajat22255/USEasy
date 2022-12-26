import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';

const register = async ( req, res ) => {
    const { username, email, password, lastname, location } = req.body;
    if ( !username || !email || !password ) {
        throw new BadRequestError( 'Please provide all the values' )
    }

    const userAlreadyExist = await User.findOne( { email } );
    if ( userAlreadyExist ) {
        throw new BadRequestError( 'User already exist' )
    }
    const user = await User.create( { username, email, password, lastname, location } )
    const token = user.createJWT();
    res.status( StatusCodes.CREATED ).json( { user: { email: user.email, name: user.username, lastname: user.lastname, location: user.location }, token, location: user.location } )
}
const login = async ( req, res ) => {
    const { email, password } = req.body
    if ( !email || !password ) {
        throw new BadRequestError( 'Please provide all values!' )
    }
    // In the mongoose schema we set the password select property to false, so findOne will not return password
    // Also will not allow us to fetch password in user model compare password, so we need to tell explicitly
    const user = await User.findOne( { email } ).select( '+password' )
    if ( !user ) {
        throw new UnAuthenticatedError( 'Invalid Credentials' )
    }

    const isPasswordCorrect = await user.comparePassword( password )
    if ( !isPasswordCorrect ) {
        throw new UnAuthenticatedError( 'Invalid Credentials' )
    }
    const token = user.createJWT()
    //Mark the pass undefined to hide it in the response.
    user.password = undefined
    res.status( StatusCodes.OK ).json( { user, token, location: user.location } )
}
const updateUser = async ( req, res ) => {
    res.send( 'Update User' )
}
export { register, login, updateUser }