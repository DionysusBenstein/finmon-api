import pkg from 'mongoose';
const { Schema, model } = pkg;

const User = new Schema({
    // createdAt: { type: Date, expires: 3600 },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    plan: { type: String, required: true  },
    budgets: [{
        id: String,
        amount: String,
        isNotify: Boolean,
        limit: String,
        date: String
    }]  
});

export default model('User', User);
