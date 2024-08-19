import * as trpcExpress from '@trpc/server/adapters/express'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import { appRouter } from './trpc'

dotenv.config()

const app = express()

const isProduction = process.env.NODE_ENV === 'production'

app.use(
  cors({
    origin: isProduction ? 'https://flickr-feed-app.vercel.app' : '*',
    credentials: true,
  })
)

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
)

const PORT = process.env.PORT || 5000

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})
