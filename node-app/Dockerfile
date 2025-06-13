# Stage 1: Build the TypeScript code 
FROM node:18 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Stage 2: Run the app using only dist
FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/index.js"]