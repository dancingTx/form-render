export default {
  default (h, currItem, slot) {
    return currItem.__slot__[slot]
  }
}
