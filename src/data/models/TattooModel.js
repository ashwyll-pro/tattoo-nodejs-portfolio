import mongoose from "mongoose";
const tattooSchema = new mongoose.Schema({
    tattooStyle: String,
    tattooPrompt: String,
    tattooDescription: String,
    tattooFileName: String,
    tattooPublicDisplay: Boolean
})

const tattoo = mongoose.model("tattoo", tattooSchema)

export default tattoo