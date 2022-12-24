import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: [ true, ' Please provide name' ],
        minlength: 3,
        maxlength: 20,
        trim: true
    },
    email: {
        type: String,
        required: [ true, ' Please provide email' ],
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email address'
        },
        unique: true
    },
    password: {
        type: String,
        required: [ true, ' Please provide password' ],
        minlength: 3,
        select: false
    },
    lastname: {
        type: String,
        required: [ true, ' Please provide last name' ]
    },
    location: {
        type: String,
        maxlength: 20,
        trim: true,
        default: 'New York, NY, USA'
    }
} )

UserSchema.pre( 'save', async function() {
    const salt = await bcrypt.genSalt( 10 );
    this.password = await bcrypt.hash( this.password, salt )
} )

UserSchema.methods.createJWT = function() {
    return jwt.sign( { userId: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME } )
}
export default mongoose.model( 'User', UserSchema )