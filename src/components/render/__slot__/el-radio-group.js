import { typeOf, isPlainObject } from '@/utils'
export default {
  options (h, currItem, key) {
    const genOptionsChildren = function (options, defaultOpts) {
      const { isBorder, isButton } = defaultOpts
      return options.map(option => {
        if (isButton) {
          return (
            <el-radio-button
              label={option.value || ''}
              name={option.name || ''}
            >
              {option.label}
            </el-radio-button>
          )
        }
        return (
          <el-radio
            label={option.value || ''}
            border={isBorder || false}
            name={option.name || ''}
          >
            {option.label}
          </el-radio>
        )
      })
    }
    const isGroup = currItem.__config__.isGroup || false
    const isButton = currItem.__config__.isButton || false
    const isBorder = currItem.__config__.isBorder || false
    let optionsSlot = currItem.__slot__[key]
    if (!optionsSlot) return null
    optionsSlot = typeOf(optionsSlot, 'array')
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
