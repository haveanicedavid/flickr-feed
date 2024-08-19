# Flickr Feed

Deployed app [here](https://flickr-feed-app.vercel.app/)

## Local Setup

1. Make sure you have [pnpm](https://pnpm.io) set up
1. Clone this repo
1. `pnpm install`
1. `cp server/.env.example server/.env` and add your flickr API key
1. `pnpm start`

## Project aims

In my conversations during the interview process so far, I recalled two
potential pain points being mentioned:

- Type safety
- Performance on large data sets

In this challenge, I attempt to meet the given requirements in a way that
demonstrates how I might approach those issues:

### Types

I'm using [tRPC](https://trpc.io) on the server to ensure type safety between
server endpoints and client data. This isn't the only approach, but it's a
solution I find scales well once the basics are in place, as strongly-typed
server response data is fully available in the client

### Caching

This project has two layers of caching:

1. React-query (through tRPC's official wrapper, which simplifies some boilerplate) in the client
1. A simple implementation of [Node
   Cache](https://www.npmjs.com/package/node-cache) on the server, which stores
   response data for 60 seconds but can be bypassed to fetch fresh data through
   the UI

## Notes

- Some of the tests I wrote are to demonstrate general testing
  tooling knowledge (mocking, etc) more than actually representing _good tests_.
  Good tests to me are those which are focused on core business logic, while much
  of the content of this repo is essentially testing 3rd party libs (which
  creates unnecessary issues at scale)
- Right now, UI folder structure is pretty flat for simplicity, but at scale I
  like structured approaches like [Atomic
  Design](https://atomicdesign.bradfrost.com/), grouping by feature, etc
  depending on project aims
- While I tried to make a decently pleasant UI that mimics some of the current
  site's aesthetic, it wasn't my focus in this challenge. I used Bootstrap as per
  the requirement and am comfortable with it, but generally prefer more modern
  component / css libraries ([shadcn/ui](https://ui.shadcn.com) is my current
  go-to on side projects)
