<template>
  <div class="container">
    <!-- left panel -->
    <div class="container__left">
      <el-scrollbar class="scrollbar">
      </el-scrollbar>
    </div>
    <!-- body -->
    <div class="container__main">
      <el-scrollbar class="scrollbar">
      </el-scrollbar>
    </div>
    <!-- right panel -->
    <div class="container__right">
      <el-scrollbar class="scrollbar">
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style lang="scss" scoped>

.a {
  height: 1000px;
}
</style>
