import * as React from 'react'
// import './index.less'

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
