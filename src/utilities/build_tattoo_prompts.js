function buildTattooPrompt() {
    const negativeKeywords = [
      "no skin", "no body", "no arm", "no hand", "no chest", "no leg", "no foot",
      "no person", "no model", "no human", "no mockup",
      "no clothing", "no fabric", "no background scene",
      "no floor", "no wall", "no watermark"
    ]
  
    return `${negativeKeywords.join(', ')}`
  }

  export default buildTattooPrompt