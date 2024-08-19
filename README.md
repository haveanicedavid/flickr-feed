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

## Notes

- Some of the tests I wrote are to demonstrate general testing
  tooling knowledge (mocking, etc) more than actually representing _good tests_.
  Good tests to me are those which are focused on core business logic, while much
  of the content of this repo is essentially testing 3rd party libs
- Right now, UI folder structure is pretty flat for simplicity, but at scale I
  like structured approaches like [Atomic
  Design](https://atomicdesign.bradfrost.com/), grouping by feature, etc
  depending on project aims
