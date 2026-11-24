
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY Backend ./Backend
COPY Frontend ./Frontend
COPY Data ./Data

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/Backend ./Backend
COPY --from=builder /app/Frontend ./Frontend
COPY --from=builder /app/Data ./Data

EXPOSE 3000

CMD ["npm", "start"]
