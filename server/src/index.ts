import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())

// Public feed endpoint
app.get('/api/photos', async (req, res) => {
  // TODO: fetch public feed from Flickr API
})

// Search endpoint
app.get('/api/search', async (req, res) => {
  const { tags } = req.query
  // TODO: fetch search results from Flickr API
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
