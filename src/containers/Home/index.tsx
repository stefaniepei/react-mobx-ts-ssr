import * as React from 'react'
// import './index.less'

/** 所有需用到的组件 **/

interface Props {
  actions: any,
}

class Home extends React.Component {

  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className='page-container' style={{background:'red'}}>
        <div>
          Home
        </div>
        <button onClick={this.clickHandle}>点我</button>
      </div>
    )
  }

  clickHandle(){
    console.log('点中啦!!!!!')
  }
}

export default Home
