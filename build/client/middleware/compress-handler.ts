import * as koaCompress from 'koa-compress'

class CompressHandler {
  register(opts) {
    return koaCompress({
      threshold: opts.threshold || '100kb',
      flush: require('zlib').Z_BEST_SPEED,
    })
  }
}

const handler = new CompressHandler()

export default handler
