import mongoose from "mongoose";

const URI = process.env.MONGODB_URL

mongoose.connect(`${URI}`) .then(() => console.log('Connected to MongoDB...'))
.catch((err)=>console.log(`Could not connect to MongoDB...${err}`))