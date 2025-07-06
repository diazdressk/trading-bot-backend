# Stage 1: Build
FROM node:20-alpine AS buildenv
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY src ./src
COPY prisma ./prisma
COPY tsconfig.json ./
COPY nest-cli.json ./
RUN npx prisma generate
RUN npm run build
RUN ls -la dist

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app
COPY --from=buildenv /app/package*.json ./
RUN npm ci --only=production
COPY --from=buildenv /app/dist ./dist
COPY --from=buildenv /app/prisma ./prisma

EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]