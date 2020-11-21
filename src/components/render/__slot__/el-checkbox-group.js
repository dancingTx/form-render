import { typeOf, isPlainObject } from '@/utils'
export default {
  options (h, currItem, key) {
    const genOptionsChildren = function (options, config) {
      return options.map(option => {
        if (config.isButton) {
          return (
            <el-checkbox-button
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
            label={option.value || ''}
            disabled={option.disabled || false}
            border={config.isBorder || false}
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
    const isBorder = currItem.__config__.isBorder || false
    let optionsSlot = currItem.__slot__[key]
    if (!optionsSlot) return null
    optionsSlot =
      typeOf(optionsSlot, 'array')
        ? optionsSlot
        : isPlainObject(optionsSlot)
          ? [optionsSlot]
          : []
    return isGroup
      ? genOptionsChildren(optionsSlot, {
        isBorder, isButton
      })
      : genOptionsChildren(optionsSlot, {
        isBorder
      })
  }
}
