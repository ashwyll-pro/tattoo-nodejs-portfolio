import TattooRepository from "../../domains/Repository/TattooRepository.js"
import tattooModel from "../models/TattooModel.js"

class TattooRepositoryImp extends TattooRepository {
    async saveTattoo(tattoo) {
      try {
        const savedTattoo = await tattooModel.create(tattoo)
        console.log(`success:`, savedTattoo)
        return savedTattoo
      } catch (error) {
        console.error(`Error saving tattoo: ${error.message}`)
        throw `Error saving tattoo: ${error.message}`
      }
    }
  
    async findAllSavedTattoo() {
      try {
        const tattoos = await tattooModel.aggregate([
          { $group: { _id: "$tattooStyle", tattoos: { $push: "$$ROOT" } } },
          { $project: { _id: 0, tattooStyle: "$_id", tattoos: { $slice: ["$tattoos", 3] } } }
        ])
        return tattoos
      } catch (error) {
        console.error(`Error finding tattoos: ${error.message}`)
        throw `Error finding tattoos: ${error.message}`
      }
    }

    async findTattoosByStyle(tattooStyle){
      try{
          const tattoos = await tattooModel.find({tattooStyle})
          return tattoos
      }catch(error){
          throw `Error: ${error.message}`
      }
    }
  }

export default TattooRepositoryImp