import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createFlickr } from 'flickr-sdk'

dotenv.config()

const app = express()
app.use(cors())

// TODO: pull this out to utils
const apiKey = process.env.FLICKR_API_KEY
if (!apiKey) {
  throw new Error('FLICKR_API_KEY is not defined in the environment variables')
}
const { flickr } = createFlickr(apiKey)

// TODO: extract to routes
// Public feed endpoint
app.get('/api/photos', async (_req, res) => {
  try {
    const response = await flickr('flickr.photos.getRecent', {
      per_page: '10',
    })
    res.json(response)
  } catch (error) {
    console.error('Error searching photos:', error)
    res.status(500).json({ error: 'Failed to search photos' })
  }
})

// TODO: extract to routes
// Search endpoint
app.get('/api/search', async (req, res) => {
  const { tag } = req.query

  if (!tag || typeof tag !== 'string') {
    return res.status(400).json({ error: 'Invalid tag' })
  }

  try {
    const response = await flickr('flickr.photos.search', {
      tags: tag,
    })
    res.json(response)
  } catch (error) {
    console.error('Error searching photos:', error)
    res.status(500).json({ error: 'Failed to search photos' })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
