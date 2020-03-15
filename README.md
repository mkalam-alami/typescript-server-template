# Typescript Server Template

A small template to get started with a TypeScript web server. Features:

* A client-side TypeScript build
* Shared code between client and server
* Live browser reload when code or assets change
* Support for a production build

## Setup

```bash
npm install
npm start
```

## Production build

```
npm run build
npm run start:prod
```

If you want to keep the production files to a minimum, deployment should only require:

* package.json
* tsconfig.prod.json
* dist/ folder
* static/ folder
* node_modules/ folder containing at least the packages installed from `npm install --production`

> TODO Actually test this