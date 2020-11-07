<template>
  <div class="layout">
    <app-main class="layout__app_main"/>
  </div>
</template>

<script>
import { appMain } from './components'
export default {
  name: 'layout',
  components: {
    appMain
  }
}
</script>
