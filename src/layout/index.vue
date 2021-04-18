<template>
  <div class="layout">
    <tools-bar class="header"/>
    <div class="container">
      <extension-bar class="extension"/>
      <main-canvas class="canvas"/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import toolsBar from './toolsBar/index.vue';
import extensionBar from './extensionBar/index.vue';
import mainCanvas from './mainCanvas/index.vue';

export default defineComponent({
  name: 'layout',
  components: {
    toolsBar,
    extensionBar,
    mainCanvas,
  },
});
</script>
