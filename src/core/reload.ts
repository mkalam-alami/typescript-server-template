import * as chokidar from "chokidar";
import log from "src/core/log";
import * as path from "path";
import reload from "reload";
import { ROOT_PATH, STATIC_PATH } from "src/constants";
import { router } from "./http-server";
import koaRouter from "koa-router";

let reloader: Promise<Reloader | undefined> = Promise.resolve(undefined);
let runOnce = false;

export interface Reloader {
  reload(): void;
}

export async function initReload(): Promise<Reloader | undefined> {
  if (!runOnce) {
    runOnce = true;
    if (process.env.NODE_ENV !== 'production') {
      reloader = createReloader();
    } else {
      setUpFakeReloadRoute();
    }
  } else {
    return reloader;
  }
}

function createReloader(): Promise<Reloader> {
  const wrappedRouter = wrapRouterForReload(router);
  reloader = reload(wrappedRouter);

  const watcher = chokidar.watch(STATIC_PATH);
  watcher.on('change', async (filename: string, stats) => {
    const relativePath = path.relative(ROOT_PATH, filename);
    log.info(`${relativePath} changed, reloading browser`);

    const readyReloader = await reloader;
    readyReloader.reload();
  });
  return reloader;
}

function setUpFakeReloadRoute(): void {
  router.get('/reload/reload.json', (ctx) => {
    ctx.body = '';
  });
}

function wrapRouterForReload(router: koaRouter) {
  const wrappedRouter = function() { }
  wrappedRouter.get = (route, callback) => {
    router.get(route, (ctx) => {
      callback(undefined, {
        type: (type) => ctx.type = type,
        send: (body) => ctx.body = body
      });
    });
  }
  return wrappedRouter;
}
