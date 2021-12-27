import pkg from 'mongoose';
const { Schema, model } = pkg;

const User = new Schema({
    // createdAt: { type: Date, expires: 3600 },
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    plan: { type: String, required: true  },
    transactions: [{
        
    }],
    budgets: [{
        name: String,
        category: String,
        id: String,
        amount: String,
        isNotify: Boolean,
        limit: String,
        date: String
    }],
    cryptowallets: [{
        address: String,
        totalBalance: Number,
        transactions: [ Object ]
    }]
});

export default model('User', User);
