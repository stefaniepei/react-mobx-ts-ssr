/* tslint:disable no-unused-variable*/
import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { NavLink } from 'react-router-dom'
/** 所有需用到的组件 **/
import './Footer.scss'

const WebLogo = require('../../../../public/img/web_logo.png')
const WebLogoEN = require('../../../../public/img/bottom_logo_en.png')

const WebCulture = require('../../../../public/img/icon_bottom_culture_web.png')
const PhoneCulture = require('../../../../public/img/icon_bottom_culture_m.png')
const WebGuardian = require('../../../../public/img/icon_bottom_guardianship_web.png')
const PhoneGuardian = require('../../../../public/img/icon_bottom_guardianship_m.png')

const Weibo = require('../../../../public/img/img_bottom_weibocoad.png')
const wechat = require('../../../../public/img/img_weixincoad.png')


const footer = {
  navs: {
    zh_CN: [
      {
        name: '关于',
        content: [
          {
            name: '关于我们',
            to: '/',
          },
          {
            name: '发展历程',
            to: '/news',
          },
          {
            name: '加入我们',
            to: '/publish',
          },
          {
            name: '联系',
            to: '/incubator',
          },
        ],
      },
      {
        name: '支持',
        content: [
          {
            name: '账号服务协议',
            to: '/',
          },
          {
            name: '法律声明',
            to: '/news',
          },
        ],
      },
      {
        name: '更多',
        content: [
          {
            name: '炫踪开放平台',
            to: '/',
          },
        ],
      },
    ],
    en_US: [
      {
        name: 'About',
        content: [
          {
            name: 'Home',
            to: '/',
          },
          {
            name: 'New',
            to: '/news',
          },
          {
            name: 'Publish',
            to: '/publish',
          },
          {
            name: 'Incubator',
            to: '/incubator',
          },
        ],
      },
      {
        name: 'About',
        content: [
          {
            name: 'Home',
            to: '/',
          },
          {
            name: 'New',
            to: '/news',
          },
        ],
      },
      {
        name: 'About',
        content: [
          {
            name: 'GAME4US',
            to: '/',
          },
        ],
      },
    ],
  },
  text: {
    zh_CN: {
      culture: '互联网文化与经营单位',
      guardian: '未成年人家长监护工程',
      copyright: '上海炫踪网络股份有限公司 版权所有',
      IPC: '沪ICP备15034524号',
    },
    en_US: {
      culture: 'xxxxxxxxxx',
      guardian: 'xxxxxxxxx',
      copyright: 'Copyright Shinezone Network Co., Ltd.',
      IPC: 'All Rights Reserved. Shanghai ICP 15034524',
    },
  },
  images: {
    zh_CN: {
      webSrc: require('../../../../public/img/web_logo.png'),
    },
    en_US: {
      webSrc: require('../../../../public/img/bottom_logo_en.png'),
    },
  },
}

interface Props {
  actions: any,
}
// interface State {
//   top0: boolean
// }

@inject('Base')
@observer
class Footer extends React.Component<any, any> {

  constructor(props: Props) {
    super(props)
  }

  show() {

  }

  render() {
    const me = this
    const { locale, showErwei, erwei } = me.props.Base
    return (
      <div className='index-footer'>
        {/* <div className="container-wrap">
          <div className="container">
            <div className='item-center'>
             <img className='logo' src={footer.images[locale].webSrc} alt="" />
            </div>
            {
              footer.navs[locale].map((item: any, index: number) => {
                return index != 2 ?
                  <div className='item' key={index}>
                    <div className="title">{item.name}</div>
                    {
                      item.content.map((subItem: any, subIndex: number) => {
                        return <NavLink
                          to={subItem.to}
                          className='sub-item'
                          key={subIndex}
                        >
                          {subItem.name}
                        </NavLink>
                      })
                    }
                  </div>
                  :
                  <div className='item' key={index}>
                    <div className="title">{item.name}</div>
                    {
                      item.content.map((subItem: any, subIndex: number) => {
                        return <div key={subIndex}>
                          <NavLink
                            to={subItem.to}
                            className='sub-item'
                          >
                          {subItem.name}
                          </NavLink>
                        </div>
                      })
                    }
                    <div className='contact-way'>
                      <i className={erwei === 'wx' ? 'icon icomoon icon-icon_bottom_weixin_default active' : 'icon icomoon icon-icon_bottom_weixin_default'} onClick={()=>{showErwei('wx')}}></i>
                      <i className={erwei === 'wb' ? 'icon icomoon icon-icon_bottom_sina_default active' : 'icon icomoon icon-icon_bottom_sina_default'} onClick={()=>{showErwei('wb')}}></i>
                      <i className='icon icomoon icon-icon_bottom_facebook_default'></i>
                      <div className={erwei === '' ? "wechat": (erwei === 'wx' ? 'wechat show' : 'wechat show weibo')}>
                        <img src={erwei === 'wx' ? wechat : Weibo} alt=""/>
                      </div>
                    </div>
                  </div>
              })
            }
            <div className='item-center '>
              <div className='img-text'>
                <img src={WebCulture} alt=""/>
                <p className='text'>{footer.text[locale].culture}</p>
              </div>
              <div className='img-text'>
                <img src={WebGuardian} alt=""/>
                <p className='text'>{footer.text[locale].guardian}</p>
              </div>
            </div>
          </div>
        </div> */}
        <div className='footer'>
          <span className='left'>Copyright ©2017 Shinezone. All Rights Reserved.</span>
          <span>{footer.text[locale].copyright}</span>
          <span className={locale === 'zh_CN' ? '' : 'disn'}>沪网文[2016]3410-250号</span>
          <span><a className='right' href='http://www.miitbeian.gov.cn/'>{footer.text[locale].IPC}</a></span>
        </div>
      </div>
    )
  }
}

export default Footer
