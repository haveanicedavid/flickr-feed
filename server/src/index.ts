import * as trpcExpress from '@trpc/server/adapters/express'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import { appRouter } from './trpc'

dotenv.config()

const app = express()
app.use(cors())

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
