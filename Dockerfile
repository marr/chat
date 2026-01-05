FROM node:22-slim AS build

WORKDIR /app
COPY pnpm-lock.yaml package.json ./

# Enable corepack for pnpm support
RUN corepack enable
RUN pnpm install --frozen-lockfile --prod

ENV NODE_OPTIONS="--max-old-space-size=8192"

COPY . .
RUN pnpm run build
RUN pnpm run db:generate
RUN pnpm run db:migrate

FROM node:22-slim AS final
WORKDIR /app
COPY --from=build /app/.output .output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
