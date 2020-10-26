<template>
  <div class="layout">
    <left-side-bar class="layout__left_panel"/>
    <app-main class="layout__app_main"/>
    <right-side-bar class="layout__right_panel"/>
  </div>
</template>

<script>
import { leftSideBar, appMain, rightSideBar } from './components'
export default {
  name: 'layout',
  components: {
    leftSideBar,
    appMain,
    rightSideBar
  }
}
</script>
