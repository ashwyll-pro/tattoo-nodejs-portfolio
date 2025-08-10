class Tattoo{
  constructor(tattooStyle, tattooPrompt, tattooDescription, tattooFileName, tattooPublicDisplay = false){
    this.tattooStyle = tattooStyle
    this.tattooPrompt = tattooPrompt
    this.tattooDescription = tattooDescription
    this.tattooFileName = tattooFileName
    this.tattooPublicDisplay = tattooPublicDisplay
  }
}

export default Tattoo