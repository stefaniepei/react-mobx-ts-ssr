declare const require: {
  <T>(path: string): T;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void, name: any) => void;
}

import Configs, { LOCALE } from '../Configs'

export interface i18nType {
  Common: any,
  HttpCode: any,
  Options: any,
  App: {
    Home: any,
  }
}

export class i18n {
  private static _instance: i18n

  private _locale: string
  private _configs: { [key: string]: i18nType } = {}

  public static get instance(): i18n {
    if (i18n._instance === undefined) {
      i18n._instance = new i18n()
    }
    return i18n._instance
  }

  private constructor() {
    this.get(Configs.DEFAULT.LOCALE)
  }

  public get(locale?: string): i18nType {
    if (locale == undefined) {
      return this._configs[this._locale]
    }

    let _locale = i18n._check(locale)

    if (this._configs[_locale] == undefined) {
      this._configs[_locale] = {
        Common: require('./' + _locale + '/Common/Common'),
        HttpCode: require('./' + _locale + '/Common/HttpCode'),
        Options: require('./' + _locale + '/Common/Options'),
        App: {
          Home: require('./' + _locale + '/App/Home'),

        },
      }
    }

    this._locale = _locale
    return this._configs[_locale]
  }

  protected static _check(locale: string): string {
    switch (locale) {
      case LOCALE[LOCALE.en_US]:
      case LOCALE[LOCALE.zh_CN]:
        return locale
      default:
        return Configs.DEFAULT.LOCALE
    }
  }
}

export default i18n
