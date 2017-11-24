/* tslint:disable no-unused-variable*/
import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { NavLink } from 'react-router-dom'
/** 所有需用到的组件 **/
import './Header.scss'

// interface Props {
//   actions: any,
// }
// interface State {
//   top0: boolean
// }

const header = {
  navs: {
    zh_CN: [
      // {
      //   name: '首页',
      //   to: '/',
      // },
      // {
      //   name: '新闻',
      //   to: '/news',
      // },
      // {
      //   name: '发行',
      //   to: '/publish',
      // },
      {
        name: '孵化',
        to: '/incubator',
      },
    ],
    en_US: [
      // {
      //   name: 'Home',
      //   to: '/',
      // },
      // {
      //   name: 'New',
      //   to: '/news',
      // },
      // {
      //   name: 'Publish',
      //   to: '/publish',
      // },
      {
        name: 'Incubator',
        to: '/incubator',
      },
    ],
  },
  languages: {
    zh_CN: {
      name: '简体中文',
      type: 'zh_CN',
    },
    en_US: {
      name: 'ENGLISH',
      type: 'en_US',
    },
  },
  images: {
    zh_CN: {
      // webSrc: require('../../../../public/img/web_logo.png'),
      // phoneSrc: require('../../../../public/img/m_logo.png'),
    },
    en_US: {
      // webSrc: require('../../../../public/img/web_logo_en.png'),
      // phoneSrc: require('../../../../public/img/m_logo_en.png'),
    },
  },
}
@inject('Base')
@observer
class Header extends React.Component<any, any> {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this))
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this))
  }
  handleScroll() {
    const me = this
    const { setHeaderZero } = me.props.Base
    let scrollTop = 0
    if (document.documentElement && document.documentElement.scrollTop) {
      scrollTop = document.documentElement.scrollTop
    }
    else if (document.body) {
      scrollTop = document.body.scrollTop
    }
    setHeaderZero(scrollTop === 0 ? true : false)
  }

  render() {
    const me = this
    const { isScroll0, languageSetter, getLanguageSetter, setLanguage, locale } = me.props.Base
    return (
      <div className={isScroll0 ? 'index-header' : 'index-header nav-collapse'}>
        <div className='logo'>
          <img className='web-logo' src={header.images[locale].webSrc} alt='' />
          <img className='phone-logo' src={header.images[locale].phoneSrc} alt='' />
        </div>
        <nav className='nav-wrap'>
          {
            header.navs[locale].map((item: any, index: number) => {
              return <NavLink
                to={item.to}
                className='nav-item'
                key={index}
              >
                {item.name}
              </NavLink>
            })
          }
        </nav>
        <div className='language' onClick={getLanguageSetter}>
          <div className='language-wrap'>
            <span className='current-language'>{header.languages[locale].name}</span>
            <li className={!languageSetter ? 'anticon anticon-caret-down' : 'anticon anticon-caret-up'}></li>
          </div>
          <ul className={!languageSetter ? 'dropdown-toggle' : 'dropdown-toggle show'}>
            {
              Object.keys(header.languages).map((item: any, index: number) => (
                <li key={index}
                  onClick={() => { setLanguage(header.languages[item].type) }}
                >
                  {header.languages[item].name}
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default Header
