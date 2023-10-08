# 🤸 rezervo-web

[![rezervo-web](https://img.shields.io/badge/ghcr.io-mathiazom%2Frezervo--web-blue?logo=docker)](https://github.com/users/mathiazom/packages/container/package/rezervo-web)

Web client for [`rezervo`](https://github.com/mathiazom/rezervo), including booking schedules and user preferences.

### 🧑‍💻 Development

#### 🧑‍🔧 Setup

1. Install dependencies using Yarn
   ```shell
   yarn install
   ```
2. Define your own `.env.local` from [`.env.local.example`](.env.local.example)

   ```shell
   cp .env.local.example .env.local
   ```

   > If you want [on-demand revalidation](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation), make sure to define `REVALIDATION_SECRET_TOKEN` in `.env.local`

   > [`.env`](.env) provides default dummy values as a workaround for [auth0/nextjs-auth0#1356](https://github.com/auth0/nextjs-auth0/issues/1356), and must be overridden with `.env.local`

3. Setup and start the [rezervo](https://github.com/mathiazom/rezervo) backend

#### 🧶 Run with Yarn

```shell
yarn dev

# or

yarn build && yarn start
```

#### 🐋 Run with Docker

1. Make sure you have defined `.env.local` as described above
2. With [docker](https://docs.docker.com/get-docker/) and [docker compose](https://docs.docker.com/compose/) installed, run
   ```shell
   docker compose -f docker-compose.dev.yml up -d --build
   ```

#### 🧹 Code style, lint and type checking

```shell
yarn prettier
yarn lint
yarn tsc
```

#### 🔌 Support new integration

Add your own integration by adding it to [`activeIntegrations`](src/lib/activeIntegrations.ts).
