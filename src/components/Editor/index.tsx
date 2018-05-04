import * as React from 'react'
import Configs from '../../common/Configs'
import _debug from 'debug'
const debug = _debug('app:Common:Editor')

import BraftEditor from 'braft-editor'
import { convertHTMLToRaw } from 'braft-convert'
import 'braft-editor/dist/braft.css'

interface Props {
  content: string, // 内容
  changeContent: any,
  changeInit: any,
}

class Editor extends React.PureComponent<Props, any> {

  constructor(props: Props) {
    super(props)
    this.state = {
      content: (this.props.content) || '',
      contentId: 0,
    }
  }
  componentWillReceiveProps(nextProps: any) {
    const me = this
    // 原始数据发生改变
    if (me.props.content !== nextProps.content) {
      me.setState({
        content: (nextProps.content) || '',
        contentId: this.state.contentId + 1,
      })
    }

  }

  render() {

    const handleRawChange = (content) => {
      this.props.changeContent(content)
    }

    const changeInit = () => {
      this.setState({
        contentId: this.state.contentId + 1,
      })
      this.props.changeInit()
    }

    const editorProps = {
      height: 500,
      placeholder: '最多可输入3000个字符',
      // contentFormat: 'html',
      // onHTMLChange: handleHTMLChange,
      initialContent: convertHTMLToRaw(this.state.content),
      contentId: this.state.contentId,
      onRawChange: handleRawChange,
      controls: ['bold', 'italic', 'underline', 'font-size', 'text-color', 'link', 'media'],
    }

    const uploadFn = (param) => {

      const serverURL = Configs.DEFAULT.UPLOAD_SERVER
      const xhr = new XMLHttpRequest
      const fd = new FormData()

      // libraryId可用于通过mediaLibrary示例来操作对应的媒体内容
      debug(param.libraryId)

      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      const successFn = (response) => {
        const res = JSON.parse(xhr.responseText)
        param.success({
          url: res.data.url,
        })
      }

      // 上传进度发生变化时调用param.progress
      const progressFn = (event) => {
        param.progress(event.loaded / event.total * 100)
      }

      // 上传发生错误时调用param.error
      const errorFn = (response) => {
        param.error({
          msg: 'unable to upload.',
        })
      }

      xhr.upload.addEventListener('progress', progressFn, false)
      xhr.addEventListener('load', successFn, false)
      xhr.addEventListener('error', errorFn, false)
      xhr.addEventListener('abort', errorFn, false)

      fd.append('img', param.file)
      debug(param)
      xhr.open('POST', serverURL, true)
      xhr.send(fd)

    }

    return (
      <BraftEditor {...editorProps} onBlur={changeInit} media={{ uploadFn: uploadFn, video: false, audio: false }} />
    )

  }
}

export default Editor
