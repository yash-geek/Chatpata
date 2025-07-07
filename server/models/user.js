import pkg from 'mongoose'
const { Schema, model, models } = pkg;
import {hash} from 'bcrypt'
const schema = new Schema({

    name: { type: String, required: true, },
    bio: String,
    username: { type: String, required: true, unique: true, },
    password: { type: String, required: true, select: false },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },

    }
}, {
    timestamps: true,
});

schema.pre('save',async function(next){
    if(!this.isModified('password')) 
        return next();
    this.password = await hash(this.password,10);
})

export const User = models.User || model('User', schema)