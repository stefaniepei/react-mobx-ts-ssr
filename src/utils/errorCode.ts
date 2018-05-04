const ErrorCode = {
  '401': {
    'en_US': 'Authentication failed,please login!',
    'zh_CN': '鉴权失败，请重新登录！',
  },
  '404': {
    'en_US': 'Not Found!',
    'zh_CN': 'Api找不到！',
  },

  /** 2001001 - 2001999 api-gateway 错误码**/
  '2001001': {
    'en_US': 'Successful!',
    'zh_CN': '成功！',
  },
  '2001002': {
    'en_US': 'Database error!',
    'zh_CN': '数据库错误！',
  },
  '2001003': {
    'en_US': 'Item already exists!',
    'zh_CN': '项目已存在！',
  },
  '2001004': {
    'en_US': 'Item not found!',
    'zh_CN': '找不到该道具',
  },
  '2001005': {
    'en_US': 'Function cannot be used when table is sharded!',
    'zh_CN': '当表被切分时，不能使用函数！',
  },
  '2001006': {
    'en_US': 'Unknown Error!',
    'zh_CN': '未知错误！',
  },

  '2001101': {
    'en_US': 'Params error!',
    'zh_CN': '参数错误！',
  },
  '2001102': {
    'en_US': 'Application Id is illegal!',
    'zh_CN': '应用程序id非法！',
  },
  '2001103': {
    'en_US': 'Application name is illegal!',
    'zh_CN': '应用程序名非法！',
  },
  '2001104': {
    'en_US': 'Application alias name is illegal!',
    'zh_CN': '应用程序别名非法！',
  },
  '2001105': {
    'en_US': 'Application url is illegal!',
    'zh_CN': '应用程序网址非法！！',
  },
  '2001106': {
    'en_US': 'Application type is illegal!',
    'zh_CN': '应用程序类型非法！',
  },
  '2001107': {
    'en_US': 'Application game type is illegal!',
    'zh_CN': '应用程序游戏类型非法！',
  },
  '2001108': {
    'en_US': 'Application status is illegal!',
    'zh_CN': '应用程序状态非法！',
  },
  '2001109': {
    'en_US': 'Application function name is illegal!',
    'zh_CN': '应用程序函数名非法！',
  },
  '2001110': {
    'en_US': 'Application function alias name is illegal!',
    'zh_CN': '应用程序函数别名非法！',
  },
  '2001111': {
    'en_US': 'Application function type is illegal!',
    'zh_CN': '应用程序函数类型非法！！',
  },
  '2001112': {
    'en_US': 'Application function status is illegal!',
    'zh_CN': '应用程序函数状态非法！！',
  },
  '2001113': {
    'en_US': 'sourceType is illegal!',
    'zh_CN': '数据类型非法！',
  },
  '2001114': {
    'en_US': 'receiveType is illegal!',
    'zh_CN': '接收类型非法！',
  },
  '2001115': {
    'en_US': 'intervalDay is illegal!',
    'zh_CN': '间隔时间非法！',
  },
  '2001116': {
    'en_US': 'messageState is illegal!',
    'zh_CN': '消息状态非法！！',
  },
  '2001117': {
    'en_US': 'isGlobalSync is illegal!',
    'zh_CN': '全球化非法！！',
  },
  '2001118': {
    'en_US': 'Api sign err!',
    'zh_CN': '验证签名失败，私钥发生更改未及时替换！',
  },
  '2001119': {
    'en_US': 'AccessToken expired!',
    'zh_CN': '登录过期！',
  },
  '2001120': {
    'en_US': 'Params user id err!',
    'zh_CN': '参数用户id错误！',
  },
  '2001121': {
    'en_US': 'AccountType err!',
    'zh_CN': '账户类型错误！',
  },
  '2001122': {
    'en_US': 'The third party check token err!',
    'zh_CN': '第三方检查令牌错误！',
  },
  '2001123': {
    'en_US': 'Not found account id!',
    'zh_CN': '找不到账户id！',
  },
  '2001124': {
    'en_US': 'Can not be guest accountType',
    'zh_CN': '不能是访客的账户类型！',
  },
  '2001125': {
    'en_US': 'ST expired!',
    'zh_CN': 'ST过期！',
  },
  '2001126': {
    'en_US': 'TGT expired, please login!',
    'zh_CN': 'TGT过期，请重新登录！',
  },
  '2001127': {
    'en_US': 'memSet false!',
    'zh_CN': 'mem设置错误！',
  },
  '2001128': {
    'en_US': 'Data collection error!',
    'zh_CN': '数据库连接失败！',
  },
  '2001129': {
    'en_US': 'Unable to generate sign with params!',
    'zh_CN': '无法使用参数生成签名！',
  },
  '2001130': {
    'en_US': 'Sign has expired, please generate sign with new timestamp!',
    'zh_CN': '签名已过期，请用新的时间戳生成！',
  },

  /** 2009001 - 2009999 ms-gmtool 错误码**/
  '2009001': {
    'en_US': 'Successful!',
    'zh_CN': '成功！',
  },
  '2009002': {
    'en_US': 'Database error!',
    'zh_CN': '数据库错误！',
  },
  '2009003': {
    'en_US': 'Item already exists!',
    'zh_CN': '已存在！',
  },
  '2009004': {
    'en_US': 'Item not found!',
    'zh_CN': '找不到该道具',
  },
  '2009005': {
    'en_US': 'Function cannot be used when table is sharded!',
    'zh_CN': '当表被切分时，不能使用函数！',
  },
  '2009006': {
    'en_US': 'Unknown Error!',
    'zh_CN': '未知错误！',
  },

  '2009101': {
    'en_US': 'This publishType can not edit!',
    'zh_CN': '发布类型不能被编辑！',
  },
  '2009102': {
    'en_US': 'Game server access error!',
    'zh_CN': '游戏服务器访问失败！',
  },
  '2009103': {
    'en_US': 'Response params format error!',
    'zh_CN': '响应格式错误！',
  },
  '2009104': {
    'en_US': 'Game server response with error message!',
    'zh_CN': '游戏服务器返回错误信息！',
  },
  '2009105': {
    'en_US': 'Unable to generate sign with params!',
    'zh_CN': '无法使用这些参数生成签名！',
  },
  '2009106': {
    'en_US': 'languageUsedIds array must contain 1!',
    'zh_CN': '已使用语言列表id必须包含1！',
  },
  '2009107': {
    'en_US': 'Message does not exist!',
    'zh_CN': '消息不存在！',
  },
  '2009108': {
    'en_US': 'Editable deadline passed. Message cannot be disabled!',
    'zh_CN': '已过编辑时限，消息不能被禁用！',
  },
  '2009109': {
    'en_US': 'Editable deadline passed. Message cannot be enabled!',
    'zh_CN': '已过编辑时限，消息不能被启用！',
  },
  '2009110': {
    'en_US': 'Convert timeStr to timestamp error!',
    'zh_CN': '转换时间戳发生错误！',
  },

  '2009111': {
    'en_US': 'Cannot find message!',
    'zh_CN': '找不到该消息！',
  },
  '2009112': {
    'en_US': 'Cannot find jobVersion!',
    'zh_CN': '找不到该版本！',
  },
  '2009113': {
    'en_US': 'Cannot get white list!',
    'zh_CN': '找不到白名单！',
  },
  '2009114': {
    'en_US': 'Cannot add ip to white list!',
    'zh_CN': '不能将该ip添加到白名单！',
  },
  '2009115': {
    'en_US': 'Cannot remove ip from white list!',
    'zh_CN': '不能将该ip移出白名单！',
  },
  '2009116': {
    'en_US': 'Current char not in CHARS_TO_GEN_RANDOM_STR!',
    'zh_CN': '当前字符不在规定范围之内！',
  },
  '2009117': {
    'en_US': 'ActivationCode does not exist!',
    'zh_CN': '激活码不存在！',
  },
  '2009118': {
    'en_US': 'ActivationCode is being generated, please wait!',
    'zh_CN': '激活码正在创建中，请稍候！',
  },
  '2009119': {
    'en_US': 'Fail to generate ctivationCode, please try again!',
    'zh_CN': '无法生成ctivation代码,请重试！',
  },
  '2009120': {
    'en_US': 'PackageBatch has not started yet or has expired!',
    'zh_CN': '批处理未启动或已过期！',
  },
  '2009121': {
    'en_US': 'Current packageBatch is not available in this server!',
    'zh_CN': '当前批处理在服务器中不可用！',
  },
  '2009122': {
    'en_US': 'Message is disabled!',
    'zh_CN': '消息已关闭！',
  },
  '2009123': {
    'en_US': 'User has used the activationCode!',
    'zh_CN': '该激活码已使用！',
  },
  '2009124': {
    'en_US': 'Message can only be edit when it is unpublished!',
    'zh_CN': '消息只能在未发布时进行编辑！',
  },
  '2009125': {
    'en_US': 'PublishCode error, message cannot be published!',
    'zh_CN': '发布码错误，不能发布消息！',
  },
  '2009126': {
    'en_US': 'Multiple package can not add activation!',
    'zh_CN': '该礼包类型不能添加激活码！',
  },
  '2009127': {
    'en_US': 'PackageName has already existed!',
    'zh_CN': '礼包名称已存在！',
  },
  '2009128': {
    'en_US': 'publishName has already existed!',
    'zh_CN': '名称已存在！',
  },
  '2009129': {
    'en_US': 'publishCode has already existed!',
    'zh_CN': '编号已存在！',
  },
  '2009130': {
    'en_US': 'playerModelName has already existed',
    'zh_CN': '名称已存在!',
  },
  '2009131': {
    'en_US': 'playerModelCode has already existed',
    'zh_CN': '编号已存在!',
  },
}

const ErrorMsg = (res) => {
  if (res && res.code && res.message) {
    if (ErrorCode.hasOwnProperty(String(res.code))) {
      if (ErrorCode[res.code].hasOwnProperty('zh_CN')) {
        return ErrorCode[res.code]['zh_CN']
      } else if (ErrorCode[res.code].hasOwnProperty('en_US')) {
        return ErrorCode[res.code]['en_US']
      } else {
        return res.message
      }
    } else {
      return res.message
    }
  } else if (res && res.statusText) {
    return res.statusText
  } else {
    return '未知错误'
  }

}

export default ErrorMsg
