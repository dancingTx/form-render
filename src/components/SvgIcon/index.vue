<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-icon svg-external-icon"
    v-on="$listeners"
  />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :href="iconName" />
  </svg>
</template>

<script>
import { isExternal } from '@/utils'
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    isExternal () {
      return isExternal(this.iconName)
    },
    iconName () {
      return `#icon-${this.iconClass}`
    },
    svgClass () {
      return 'svg-icon' + (this.className ? ' ' + this.className : '')
    },
    styleExternalIcon () {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-external-icon {
  display: inline-block;
  mask-size: cover!important;
  background-color: currentColor;
}
</style>
