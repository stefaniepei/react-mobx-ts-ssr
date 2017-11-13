import * as React from 'react'
import {Helmet} from 'react-helmet'
// import './index.scss'

/** 所有需用到的组件 **/

interface Props {
  actions: any,
}

class Login extends React.Component {

  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className='page-container' style={{background:'blue'}}>
        <Helmet>
          <title>登录页的标题</title>
          <meta name="keywords" content="登录页的关键字" />
          <meta name="description" content="登录页的描述" />
        </Helmet>
        <div>
          Login
        </div>
        <button onClick={this.clickHandle}>登录</button>
      </div>
    )
  }

  clickHandle(){
    console.log('登录啦!!!!!')
  }
}

export default Login
