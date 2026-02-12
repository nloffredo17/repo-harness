FROM node:20-bookworm-slim

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /workspace

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/template/package.json ./packages/template/
RUN pnpm install --frozen-lockfile

COPY packages/template ./packages/template

WORKDIR /workspace/packages/template
EXPOSE 3000
CMD ["pnpm", "dev"]
