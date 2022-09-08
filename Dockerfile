#* Deps
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

# Installing pnpm
RUN npm install -g pnpm

# Installing dependencies
RUN pnpm install --frozen-lockfile

#* Builder
FROM node:18-alpine AS builder
WORKDIR /app

# Copying files from deps to builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Setting Env variables
ENV NEXT_TELEMETRY_DISABLED 1
ENV DOCKER_BUILD 1

# Building application
RUN npm run build

#* Runner
FROM node:18-alpine AS runner
WORKDIR /app

# Setting Env variables
ENV NODE_ENV production

# Creating nextjs user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copyning files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Settings user and prot
USER nextjs
EXPOSE 3000
ENV PORT 3000

# Running application
CMD ["node", "server.js"]