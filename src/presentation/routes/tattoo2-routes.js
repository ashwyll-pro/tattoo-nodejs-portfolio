import express from "express"
import Replicate from "replicate"
import path from "path"
import sharp from 'sharp'
import TattooRepositoryImp from "../../data/Repository/TattooRepositoryImp.js"
import TattooUseCase from "../../domains/UseCase/TattooUseCase.js"
import Tattoo from "../../domains/Entity/Tattoo.js"
import saveImageFromUrl from "../../infrastructure/storage/imageService.js"
import buildTattooPrompt from "../../utilities/build_tattoo_prompts.js"

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { error } from "console"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = express.Router()
const tattooRepositoryImp = new TattooRepositoryImp()
const tattooUseCase = new TattooUseCase(tattooRepositoryImp)

router.post('/', async (req, res)=>{
    try{
        let body = req.body

        const { promptText, tattooStyle, tattooDescription } = req.body

        let userPrompt = `${promptText}, Style: ${tattooDescription}, Type: tattoo artwork, quality: high, background: clean white background`
        let finalPrompt = `${userPrompt}, ${buildTattooPrompt()}`

        console.log("final prompt", finalPrompt)
        
        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN
          });

        const input = {
            prompt: finalPrompt,
            aspect_ratio: "1:1"
        }

        const output = await replicate.run("google/imagen-4-fast", { input });
        
        if (!output) {
            return res.status(400).json({ error: 'No image was generated from the prompt. Please try again with a different description.' })
          }

          console.log(`output: ${output}`)

        const imageURL =  String(output)
        res.status(200).json({imageUrl: imageURL})

        const filename = `${Date.now()}.jpg`
        const tattoo = new Tattoo(tattooStyle, promptText, tattooDescription, filename)

        await saveImageFromUrl(imageURL, filename)
        await tattooUseCase.addNewTattoo(tattoo)
       
    }catch(errror){
        console.log(`Error: ${errror}`)
        res.status(500).json({ error: 'Image generation failed' })
    }
})

router.get('/tattoo', async(req, res)=>{
    try{
        const tattoos = await tattooUseCase.findAllSavedTattoo()
        res.status(200).json(tattoos)
    }catch(error){
        console.log(`Error: ${error.message}`)
        res.status(500).json({error: 'Unable to fetch tattoo'})
    }
})

router.get('/tattoo/:tattooStyle', async(req, res)=>{
    try{
        const tattooStyle = req.params.tattooStyle
        const tattoos = await tattooUseCase.findTattoosByStyle(tattooStyle)
        res.status(200).json(tattoos)
    }catch(error){
        console.log(`Error: ${error.message}`)
        res.status(500).json({error: 'Unable to fetch tattoo'})
    }
})

//expose image on passing the filename
router.get('/image/:filename', async (req, res)=>{
    const filename = req.params.filename
    const filePath = path.join(__dirname, '../../../', 'src/infrastructure/storage/uploads', filename)

    try{
        const resizedImageBuffer = await sharp(filePath)
        .resize(200, 200)
        .toBuffer()

        res.type('image/jpeg')
        res.send(resizedImageBuffer)
    }catch{
        console.error("Image not found:", error)
            res.status(404).json({error: "image not found"})
    }
})

//for download only
router.get('/image/download/:filename', async (req, res)=>{
    const filename = req.params.filename
    const filePath = path.join(__dirname, '../../../', 'src/infrastructure/storage/uploads', filename)

    res.sendFile(filePath, (error)=>{
        if (error){
            console.error("Image not found:", error)
            res.status(404).json({error: "image not found"})
        }
    })
})

export default router