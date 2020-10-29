<template>
  <div class="layout">
    <app-header class="layout__app_header"/>
    <app-main class="layout__app_main"/>
    <app-footer class="layout__app_footer"/>
  </div>
</template>

<script>
import { appHeader, appMain, appFooter } from './components'
export default {
  name: 'layout',
  components: {
    appHeader,
    appMain,
    appFooter
  }
}
</script>
