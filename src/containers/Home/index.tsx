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
      <div>
        <div className='page-container'>
          Home
        </div>
      </div>
    )
  }
}

export default Home
