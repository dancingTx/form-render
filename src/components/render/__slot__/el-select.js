import { typeOf, isPlainObject } from '@/utils'
export default {
  prefix (h, currItem, key) {
    return currItem.__slot__[key]
  },
  empty (h, currItem, key) {
    return currItem.__slot__[key]
  },
  options (h, currItem, key) {
    const genChildOption = function (options) {
      return options.map(option => {
        return (
          <el-option
            label={option.label || ''}
            value={option.value || ''}
            disabled={option.disabled || false}
          />
        )
      })
    }
    const isGroup = currItem.__config__.isGroup || false
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
