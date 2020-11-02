import { typeOf, isPlainObject } from '@/utils'
export default {
  prefix (h, currItem, key) {
    return currItem.__slot__[key]
  },
  empty (h, currItem, key) {
    return currItem.__slot__[key]
  },
  options (h, currItem, key) {
    const genChildOption = function (children) {
      return children.map(item => {
        return (
          <el-option
            label={item.label || ''}
            value={item.value || ''}
            disabled={item.disabled || false}
          />
        )
      })
    }
    const isGroup = currItem.isGroup || false
    let optionsSlot = currItem.__slot__[key]
    if (!optionsSlot) return null
    optionsSlot =
      typeOf(optionsSlot, 'array')
        ? optionsSlot
        : isPlainObject(optionsSlot)
          ? [optionsSlot]
          : null
    if (isGroup) {
      return optionsSlot.map(group => {
        return (
          <el-option-group
            label={group.label || ''}
            disabled={group.disabled || false}
          >
            {genChildOption(group.options)}
          </el-option-group>
        )
      })
    } else {
      return genChildOption(optionsSlot)
    }
  }
}
