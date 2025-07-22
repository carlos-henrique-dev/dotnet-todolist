# FROM node:20-slim
# WORKDIR /app

# RUN npm install -g pnpm
# COPY . .

# RUN rm -rf node_modules && pnpm install

# # Default command runs Vite dev server
# CMD ["pnpm", "dev"]


# Base image
FROM node:20-slim
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

CMD ["pnpm", "dev", "--host"]
