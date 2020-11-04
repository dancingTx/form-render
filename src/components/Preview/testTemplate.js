export const template = `
<template>
  <div>
    <h1>{{message}}</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: 'Template'
    }
  }
}
</script>
<style>
h1 {
  color: #f00;
}
</style>
`
