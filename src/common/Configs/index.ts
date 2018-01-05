import configs from '../../../configs'
export enum LOCALE { zh_CN, en_US }

const Host = {
  'production': 'http://xxx/v1', // 正式环境服务器
  'qa': 'http://xxx/v1', // qa服务器
  'development': 'http://xxx/v1', // 测试服务器
}

class Configs {
  private static _env: string = configs.env // 运行环境
  private static _locale: string = LOCALE[LOCALE.zh_CN] // 语言
  private static _server: { [key: string]: any } = Host[configs.env] // API服务

  public static get DEFAULT(): { [key: string]: any } {
    return {
      ENV: this._env,
      LOCALE: this._locale,
      SERVER: this._server,
    }
  }
}

export default Configs
