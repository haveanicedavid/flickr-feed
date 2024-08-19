import { inferRouterOutputs } from '@trpc/server'

import { appRouter } from './trpc'

export type FlickrPhoto = {
  farm: number
  id: string
  isfamily: number
  isfriend: number
  ispublic: number
  owner: string
  secret: string
  server: string
  title: string
}

export type AppRouter = typeof appRouter
export type ApiOutput = inferRouterOutputs<AppRouter>
