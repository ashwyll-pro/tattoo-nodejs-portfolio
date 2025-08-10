import fs from 'fs'
import path from 'path'
import axios from 'axios'

const UPLOAD_DIR = path.resolve('src/infrastructure/storage/uploads')

 async function saveImageFromUrl(imageUrl, fileName = null) {
  try {
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true })
    }

    // Use timestamp as fallback filename
    const finalFileName = fileName || `${Date.now()}.jpg`
    const filePath = path.join(UPLOAD_DIR, finalFileName)

    const response = await axios({
      method: 'GET',
      url: imageUrl,
      responseType: 'stream',
    })

    const writer = fs.createWriteStream(filePath)

    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log(`✅ Image saved to ${filePath}`)
        resolve(filePath)
      })
      writer.on('error', reject)
    })
  } catch (error) {
    console.error('❌ Failed to save image:', error.message)
    throw error
  }
}

export default saveImageFromUrl
