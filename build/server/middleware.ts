import * as compression from 'compression'
import * as morgan from 'morgan'

export default {
  compression: compression(),
  morgan: morgan()
}
