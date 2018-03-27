/* tslint:disable no-unused-variable*/
import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { NavLink } from 'react-router-dom'
/** 所有需用到的组件 **/
import './Footer.scss'

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
            name: 'GitHub开放平台',
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
      copyright: 'Stefaniepei 版权所有',
      IPC: '沪ICP备xxx号',
    },
    en_US: {
      culture: 'xxxxxxxxxx',
      guardian: 'xxxxxxxxx',
      copyright: 'Copyright Stefaniepei Network Co., Ltd.',
      IPC: 'All Rights Reserved. Shanghai ICP xxx',
    },
  },
  images: {
    zh_CN: {
      // webSrc: require('cn.png'),
    },
    en_US: {
      // webSrc: require('en.png'),
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
        <div className='footer'>
          <span className='left'>Copyright ©2018 Stefaniepei. All Rights Reserved.</span>
          <span>{footer.text[locale].copyright}</span>
          <span className={locale === 'zh_CN' ? '' : 'disn'}></span>
        </div>
      </div>
    )
  }
}

export default Footer
