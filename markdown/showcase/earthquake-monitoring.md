---
id: 'earthquake-monitoring'
name: 'Earthquake monitoring'
scores:
  accessibility: 88
  bestPractices: 92
  SEO: 100
  performance:
    mobile:
      score: 92
      fcp: 0.8
      si: 2.3
      lgp: 1.1
      tti: 3.3
      tbt: 340
      cls: 0.0
    desktop:
      score: 100
      fcp: 0.3
      si: 0.7
      lgp: 0.3
      tti: 1.0
      tbt: 0.0
      cls: 0.0
images:
  banner:
    aspectRatio: '2420/2160'
    url: '/assets/highlighted/em-banner.png'
  icon: '/assets/highlighted/em-icon.png'
  ratios:
    mobile: '1284/2778'
    desktop: '1920/1080'
  mobile:
    - '/assets/highlighted/em-m-0.png'
    - '/assets/highlighted/em-m-1.png'
  desktop:
    - '/assets/highlighted/em-d-0.png'
    - '/assets/highlighted/em-d-1.png'
website: 'https://earthquake-monitoring.amir4rab.com/'
github: 'https://github.com/amir4rab/earthquake-monitoring'
license: 'GPL-v3'
mainTechnologies:
  - next
  - react
  - framer
  - vite
  - docker
  - nginx
  - prisma
  - postgres
  - redis
  - pwa
shortInfo: 'My final project for my bachelor degree.'
background:
  muted: 'linear-gradient(66.59deg, #164CB410 0%, rgba(22, 118, 180, 0) 100%), linear-gradient(113.97deg, #1C7ED610 0%, rgba(28, 126, 214, 0) 100.83%)'
  colorful: 'linear-gradient(66.59deg, rgba(165, 23, 188, 0.75) 0%, rgba(23, 100, 188, 0) 100%), linear-gradient(113.41deg, rgba(1, 118, 255, 0.75) 0%, rgba(23, 100, 188, 0) 100%), linear-gradient(293.41deg, rgba(0, 255, 71, 0.75) 0%, rgba(0, 255, 71, 0) 100%), linear-gradient(246.59deg, rgba(0, 255, 240, 0.75) 0%, rgba(0, 255, 240, 0) 100%), #FFFFFF'
---

## TLDR

TLDR of the project is to deploy a web application, built with Next.js to be an API and a public facing website to display the recent earthquakes in Iran and close proximity regions. In addition to next.js app, there will be a packaged application with Capacitor.js to build a vite React SPA for android ( it should be possible to build the application for other platforms, but might not be possible with the short time window ). All the source code will be inside a single mono repository.

## Why?

As of 20st july 2022, Iranian Seismological Center website lacks, ssl certificate, responsible design for mobile devices, and any sort of modern design, goal of this project is to make a better version for regular users.

## Deployment method

Deployment will be standardized with docker, therefore hosting progress will be the same across the different hosts. Currently the web version is hosted on https://earthquake-monitoring.amir4rab.com and the pwa version is hosted on https://pwa.earthquake-monitoring.amir4rab.com.

---

## Development setup 💻

### Requirements

- Node.js ( 18.7.0 or higher )
- pnpm ( 7.9.0 or higher )
- Docker ( 20.10.17 or higher )
- Docker compose ( 1.29.2 or higher )

### development databases

you need to run the following commands to start databases in docker

```bash
cd /docker
# You might need to change "docker compose" to "docker-compose"
docker compose -f docker-compose.dev.yml up -d
```

### Web development ( needs database to be online )

you need to run the following commands to start a development server:

```bash
cd /web
pnpm install # Installing dependencies
pnpm run init-prisma-schema # Generating prisma types
pnpm run prisma-migrate-dev # Applying schemas to database
pnpm run dev # Starting the development server
```

### Mobile development ( needs web to be online )

you need to run the following commands to do the initial setup:

```bash
cd /mobile
pnpm install # Installing dependencies
pnpm run prisma-types # generating prisma types
```

Then you can start PWA development by the following command

```bash
pnpm run pwa-dev # Starting the development server
```

Or run the following command to start dev server with android env files

```bash
pnpm run android-dev # Starting the development server
```

### Cronjob ( needs database to be online )

you need to run the following commands to start a development server:

```bash
cd /web
pnpm install # Installing dependencies
pnpm run init-prisma-schema # Generating prisma types
pnpm run prisma-migrate-dev # Applying schemas to database
pnpm run dev # Starting the development server
```

---

## Hosting 🔥

### software requirements:

- Docker ( 20.10.17 or higher )
- Docker compose ( 1.29.2 or higher )

### Hardware requirements:

- Storage: 5G or more
- Ram: 512mg or more
- Cpu: 2cores or more

### Guide

you need to run the following commands to start hosting server, keep in mind in case your server user is root, you need to make some changes in web [Dockerfile](./web/Dockerfile). Before hosting your application you have to update couples of env files in "compose.prod.yml", we recommend making a copy of the original file and applying your changes to the copied version.

```bash
cd /docker
cp  docker-compose.prod.yml docker-compose.local.yml # then update the new file and add your env files
# You might need to change "docker compose" to "docker-compose"
docker compose -f docker-compose.local.yml up -d
```
