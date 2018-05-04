// 消息
export const MESSAGE_ENABLED = 1 // 启用
export const MESSAGE_DISABLED = 2 // 禁用
export const MESSAGE_UNPUBLISHED = 3 // 未发布
export const MESSAGE_PUBLISHED = 4 // 已发布
export const MESSAGE_PUBLISH_FALIED = 5 // 发布失败
export const MESSAGE_PLAYER_MODEL_COMPLETE = 6 // 用户模型计算完成

export const MESSAGE_RECEIVE_ONCE = 1 // 用户只会收到一次
export const MESSAGE_RECEIVE_EVERYDAY = 2 // 每次登录时收到
export const MESSAGE_RECEIVE_FEWDAY = 3 // 若干天收到一次

export const MESSAGE_GLOBAL_SYNC = 1 // 全球同步发布
export const MESSAGE_NOT_GLOBAL_SYNC = 2 // 非全球同步发布

export const MESSAGE_ADD_TEMPLATE = 0 // 保存模板,否则为更新模板

export const PLAY_MODEL_AT = 1 // 自动选择用户模型 数据中心计算
export const PLAY_MODEL_MT = 2 // 手动上传用户模型 上传用户id文件

const messageDictData = {
  // 状态
  state: {
    '1': '启用',
    '2': '禁用',
    '3': '未发布',
    '4': '已发布',
    '5': '发布失败',
    '6': '用户模型计算完成',
  },
  // 发布方式
  publishType: {
  },
  // 用户接受频次
  receiveType: {
    '1': '用户只会收到一次',
    '2': '每次登录时收到',
    '3': '天收到一次',
  },
}

export const messageDict = (key: string, dictType: string) => {
  return messageDictData[dictType][key]
}