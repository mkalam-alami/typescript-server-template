# Typescript Server Template

A template in 300 lines (config files included) to get started with a TypeScript web server. Features:

* [Koa](https://koajs.com/)-powered web server
* Client-side build without any library
* Shared code between client and server
* Live browser reload when code or assets change
* Production build

## Setup

```bash
npm install
npm start
```

## Production build

Run locally:

```
npm run build
npm run start:prod
```

Export for publishing:

```
npm run export
cd dist-export # This folder can be published anywhere
npm install --production
npm run start:prod
```
