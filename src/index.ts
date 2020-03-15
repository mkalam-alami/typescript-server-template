import "src/core/http-server";
import { startHttpServer } from "src/core/http-server";
import { initReload } from "src/core/reload";
import { startWebpack } from "src/core/webpack";
import "./routes";

(async() => {
  initReload();
  await startWebpack();
  startHttpServer();
})();
