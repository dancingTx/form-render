import { typeOf, isPlainObject } from '@/utils'
export default {
  // 前缀
  prefix (h, currItem, key) {
    const prefixSlot = currItem.__slot__[key]
    if (!prefixSlot) return null
    let template = ''
    if (isPlainObject(prefixSlot)) {
      template = (
        <i
          slot={key}
          class={prefixSlot.className ? prefixSlot.className + ' ' : '' + 'el-input__icon'}
          onClick={prefixSlot.on.click ? prefixSlot.on.click : () => {}}
        />
      )
    } else if (typeOf(prefixSlot, 'string')) {
      console.log(1)
      template = (
        <i
          slot={key}
          class={prefixSlot || ''}
        />
      )
    }

    return template
  },
  // 后缀
  suffix (h, currItem, key) {
    const suffixSlot = currItem.__slot__[key]
    if (!suffixSlot) return null
    let template = ''
    if (isPlainObject(suffixSlot)) {
      template = (
        <i
          slot={key}
          class={suffixSlot.className ? suffixSlot.className + ' ' : '' + 'el-input__icon'}
          onClick={suffixSlot.on.click ? suffixSlot.on.click : () => { }}
        />
      )
    } else if (typeOf(suffixSlot, 'string')) {
      template = (
        <i
          slot={key}
          class={suffixSlot || ''}
        />
      )
    }

    return template
  },
  prepend (h, currItem, key) {
    return (
      <template slot={key}>{currItem.__slot__[key]}</template>
    )
  },
  append (h, currItem, key) {
    return (
      <template slot={key}>{currItem.__slot__[key]}</template>
    )
  }
}
