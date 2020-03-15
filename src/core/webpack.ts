
import webpackConfig from "frontend/webpack.config.js";
import webpack from "webpack";

export function startWebpack(buildHandler?: webpack.ICompiler.Handler): Promise<webpack.Stats> {
  return new Promise((resolve, reject) => {
    const compiler = webpack({
      ...webpackConfig,
      mode: process.env.NODE_ENV || 'development'
    })

    const buildHandlerProxy = (err, stats) => {
      if (!err) resolve(stats); else reject(err);
      if (buildHandler) buildHandler(err, stats);
    }
    
    if (process.env.NODE_ENV !== 'production') {
      compiler.watch({}, buildHandlerProxy)
    } else {
      compiler.run(buildHandlerProxy)
    }

  })
}
