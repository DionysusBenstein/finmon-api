import pkg from 'mongoose';
const { Schema, model } = pkg;

const Plan = new Schema({
    value: { type: String, unique: true, default: "Free" },
});

export default model('Plan', Plan);
