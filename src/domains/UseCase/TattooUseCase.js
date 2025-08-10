import TattooRepositoryImp from "../../data/Repository/TattooRepositoryImp.js"

class TattooUseCase{
    constructor(){
        this.tattooRepository = new TattooRepositoryImp()
    }

    async addNewTattoo (tattoo) {
      try{
            const addNewTattoo = await this.tattooRepository.saveTattoo(tattoo)
            console.log(`result: ${addNewTattoo}`)
      }catch(error){
        console.log(`Error: ${error.message}`)
      }
    }

    async findAllSavedTattoo(){
      try{
        return await this.tattooRepository.findAllSavedTattoo() 
      }catch(error){
        throw `error: ${error.message}`
      }
    }

    async findTattoosByStyle(tattooStyle){
      try{
        return await this.tattooRepository.findTattoosByStyle(tattooStyle)
      }catch(error){
        throw `Error: ${error.message}`
      }
    }
}

export default TattooUseCase