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
      <div>
        <div className='page-container'>
          Login
        </div>
      </div>
    )
  }
}

export default Login
