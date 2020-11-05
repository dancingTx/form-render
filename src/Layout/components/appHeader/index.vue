<template>
  <div class="header">
    <logo class="header__logo"/>
    <btn-group class="header__btn_group"/>
    <external-links class="header__external_links"/>
  </div>
</template>

<script>
import Logo from '../logo'
import btnGroup from '../btnGroup'
import externalLinks from '../externalLinks'
export default {
  name: 'appHeader',
  components: {
    Logo,
    btnGroup,
    // eslint-disable-next-line vue/no-unused-components
    externalLinks
  }
}
</script>
