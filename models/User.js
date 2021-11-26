import pkg from 'mongoose';
const { Schema, model } = pkg;


const User = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    plan: { type: String, ref: 'Free' }
    // roles: [{ type: String, ref: 'Role' }]
});

export default model('User', User);
