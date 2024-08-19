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

export type FlickrPhotoInfo = {
  id: string
  secret: string
  server: string
  farm: number
  dateuploaded: string
  isfavorite: number
  license: string
  safety_level: string
  rotation: number
  originalsecret: string
  originalformat: string
  owner: {
    nsid: string
    username: string
    realname: string
    location: string
    iconserver: string
    iconfarm: number
  }
  title: {
    _content: string
  }
  description: {
    _content: string
  }
  visibility: {
    ispublic: number
    isfriend: number
    isfamily: number
  }
  dates: {
    posted: string
    taken: string
    takengranularity: number
    takenunknown: string
    lastupdate: string
  }
  views: string
  editability: {
    cancomment: number
    canaddmeta: number
  }
  publiceditability: {
    cancomment: number
    canaddmeta: number
  }
  usage: {
    candownload: number
    canblog: number
    canprint: number
    canshare: number
  }
  comments: {
    _content: string
  }
  notes: {
    note: any[]
  }
  people: {
    haspeople: number
  }
  tags: {
    tag: Array<{
      id: string
      author: string
      authorname: string
      raw: string
      _content: string
      machine_tag: number
    }>
  }
  urls: {
    url: Array<{
      type: string
      _content: string
    }>
  }
  media: string
}

export type AppRouter = typeof appRouter
export type ApiOutput = inferRouterOutputs<AppRouter>
