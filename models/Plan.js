import { Schema, model } from 'mongoose';

const Plan = new Schema({
    value: { type: String, unique: true, default: "Free" },
});

export default model('Plan', Plan);
