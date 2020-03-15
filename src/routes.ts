import { router } from "src/core/http-server";
import "./core/reload";
import { initReload } from "./core/reload";
import { TestResponse } from "common/test";

initReload();

router.get('/test', (ctx) => {
  const testResponse: TestResponse = 'Test works';
  ctx.body = testResponse;
});
