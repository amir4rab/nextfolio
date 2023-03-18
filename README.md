[![CodeQl checks](https://github.com/amir4rab/nextfolio/actions/workflows/codeql.yml/badge.svg)](https://github.com/amir4rab/nextfolio/actions/workflows/codeql.yml)

## Deployed instances

Stable version [amir4rab.com](https://amir4rab.com) <br>
Development version [next.amir4rab.com](https://next.amir4rab.com)

## Requirements

### Development

- Node: 16.0.0 or higher
- Pnpm: 7.0.0 or higher

### deployment

- Docker: 20.10.17 or higher
- Docker compose: 2.6.0 or higher

## Development setup

1. Installing dependencies

```bash
pnpm install
```

2. Running in dev mode

```bash
pnpm run dev
```

## Deployment

You can host the next.js application with any service that supports Next.js deployment or self host it with Docker compose

to start the container you can run the following command

```bash
docker compose up -d
```

and run the following command to stop the container

```bash
docker compose down
```
