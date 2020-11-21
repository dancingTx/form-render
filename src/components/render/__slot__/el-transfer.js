import { typeOf, caseCamel } from '@/utils'
export default {
  leftFooter (h, currItem, key) {
    const leftFooterSlot = currItem.__slot__[key]
    if (!leftFooterSlot) return null
    return (
      <template slot={caseCamel(key)}>
        {typeOf(leftFooterSlot, 'function') ? leftFooterSlot(h) : leftFooterSlot}
      </template>
    )
  },
  rightFooter (h, currItem, key) {
    const rightFooterSlot = currItem.__slot__[key]
    if (!rightFooterSlot) return null
    return (
      <template slot={caseCamel(key)}>
        {typeOf(rightFooterSlot, 'function') ? rightFooterSlot(h) : rightFooterSlot}
      </template>
    )
  }
}
