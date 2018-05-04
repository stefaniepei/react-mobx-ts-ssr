// 礼包
export const GIFT_ENABLED = 1 // 启用
export const GIFT_DISABLED = 2 // 禁用

export const GIFT_UN_USED = 1 // 未使用
export const GIFT_USED = 2 // 已使用

export const GIFT_TYPE_SINGLE = 1 // 礼包类型 单次使用
export const GIFT_TYPE_MULTIPLE = 2 // 礼包类型 多次使用

const giftDictData = {
  // 状态
  state: {
    '1': '启用',
    '2': '禁用',
  },
  // 礼包类型
  package_type: {
    '1': '单次使用',
    '2': '多次使用',
  },
  // 使用状态
  usedState: {
    '1': '未使用',
    '2': '已使用',
  },
}

export const giftDict = (key: string, dictType: string) => {
  return giftDictData[dictType][key]
}