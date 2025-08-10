import express from "express"
const router = express.Router()

import Replicate from "replicate";
router.post('/', async (req, res)=>{
    try{
        let body = req.body
       
        let prompt = body.promptText
        let tattooStyle = body.tattooStyle
        let tattooDescription = body.tattooDescription

        let finalPrompt = `prompt: '${prompt}':
        
        - Style Instruction: '${tattooDescription}'
        - Type: tattoo artwork`

        console.log("body:", finalPrompt)
       
        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN
          });

        const input = {
            prompt: finalPrompt,
            aspect_ratio: "1:1"
        }

        const output = await replicate.run("minimax/image-01", { input });
        console.log(`output: ${output}`)
       
        res.status(200).json({imageUrl: String(output[0])});

    }catch(errror){
        console.log(`Error: ${errror}`)
        res.status(500).json({ error: 'Image generation failed' })
    }
})

export default router