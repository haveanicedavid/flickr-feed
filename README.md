# Flickr Feed

## Local Setup

1. Make sure you have [pnpm](https://pnpm.io) set up
1. Clone this repo
1. `pnpm install`
1. `cp server/.env.example server/.env` and add your flickr API key
1. `pnpm start`

## TODO (or: things I'd do with more time)

- [ ] pre-commit hooks (husky) for linting / formatting
- [ ] path aliases to clean up ugly imports (Note: in the real world, I'd
      probably pull shared types into a separate repo... relative imports are a
      convenience for time)
