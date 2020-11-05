<template>
  <div class="layout">
    <app-header class="layout__app_header"/>
    <app-main class="layout__app_main"/>
  </div>
</template>

<script>
import { appHeader, appMain } from './components'
export default {
  name: 'layout',
  components: {
    appHeader,
    appMain
  }
}
</script>
