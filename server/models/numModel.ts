import mongoose from "mongoose";
import {INumPhone} from '../config/interface'

const numSchema = new mongoose.Schema({
    phoneNUmb: {type: String},
    proveName: {type: String}
}, {
    timestamps: true
})

export default mongoose.model<INumPhone>('phone', numSchema)