/* tslint:disable no-unused-variable*/
import * as React from 'react'
import {observer, inject} from 'mobx-react'
import Utils from '../../utils'
// import './index.less'

/** 所有需用到的组件 **/

interface props {
  cookies: any,
  Base: any
}

@inject('RouterStore')
@inject('Base')
@observer
class Home extends React.Component<props,any> {

  constructor(props: props) {
    super(props)
  }

  componentWillReact() {
    console.log('componentWillReact',this.props.cookies)
  }

  render() {
    const me = this
    const {add,count} = this.props.Base
    const {cookies} = this.props
    // cookies.Cookies.set('count',10, { path: '/' })

    console.log('render',this.props.cookies)
    return (
      <div className='page-container' style={{background:'red'}}>
        <div>
          Home {count}
        </div>
        <button onClick={add}>+1</button>
        <button onClick={this.addTest}>Test</button>
      </div>
    )
  }

  addTest(){
    console.log('假的+1操作!')
  }
}

export default Home
