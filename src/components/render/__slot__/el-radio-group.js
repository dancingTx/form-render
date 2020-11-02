import { typeOf, isPlainObject } from '@/utils'
export default {
  options (h, currItem, key) {
    const genOptionsChildren = function (options, isButton = false) {
      return options.map(option => {
        if (isButton) {
          return (
            <el-radio-button
              label={option.label || ''}
              disabled={option.disabled || false}
              name={option.name || ''}
            />
          )
        }
        return (
          <el-radio
            label={option.label || ''}
            value={option.value || ''}
            disabled={option.disabled || false}
            border={option.border || false}
            name={option.name || ''}
          >
            {option.content}
          </el-radio>
        )
      })
    }
    const isGroup = currItem.__config__.isGroup || false
    const isButton = currItem.__config__.isButton || false
    let optionsSlot = currItem.__slot__[key]
    if (!optionsSlot) return null
    optionsSlot = typeOf(optionsSlot, 'array')
      ? optionsSlot
      : isPlainObject(optionsSlot)
        ? [optionsSlot]
        : []
    return isGroup ? genOptionsChildren(optionsSlot, isButton) : genOptionsChildren(optionsSlot)
  }
}
