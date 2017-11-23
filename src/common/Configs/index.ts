import configs from '../../../configs'
export enum LOCALE { zh_CN, en_US }

const Host = {
  'production': 'http://172.16.0.240:9001/v1', // 目前是乱填的
  'qa': 'http://172.16.51.117:9001/v1', // 目前是liwei的电脑
  'development': 'http://172.16.51.117:9001/v1', // 目前是前端的测试服务器
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
