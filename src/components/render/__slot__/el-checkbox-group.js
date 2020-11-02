import { typeOf, isPlainObject } from '@/utils'
export default {
  options (h, currItem, key) {
    const genOptionsChildren = function (options, isButton) {
      return options.map(option => {
        if (isButton) {
          return (
            <el-checkbox-button
              key={option.value}
              label={option.value || ''}
              disabled={option.disabled || false}
              name={option.name || ''}
              checked={option.checked || false}
            >
              {option.label || ''}
            </el-checkbox-button>
          )
        }
        return (
          <el-checkbox
            key={option.value}
            label={option.value || ''}
            disabled={option.disabled || false}
            border={option.border || false}
            name={option.name || ''}
            checked={option.checked || false}
          >
            {option.label || ''}
          </el-checkbox>
        )
      })
    }
    const isGroup = currItem.__config__.isGroup || false
    const isButton = currItem.__config__.isButton || false
    let optionsSlot = currItem.__slot__[key]
    if (!optionsSlot) return null
    optionsSlot =
      typeOf(optionsSlot, 'array')
        ? optionsSlot
        : isPlainObject(optionsSlot)
          ? [optionsSlot]
          : []
    return isGroup ? genOptionsChildren(optionsSlot, isButton) : genOptionsChildren(optionsSlot)
  }
}
