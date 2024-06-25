import mongoose from "mongoose"

const games = new mongoose.Schema({
    title: String,
    poster: String,
    createdAt: Date,
    rate: Number,
    description: String
})

export default mongoose.models.Games || mongoose.model("Games", games)