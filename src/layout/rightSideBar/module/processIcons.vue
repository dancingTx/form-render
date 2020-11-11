<template>
  <div class="item">
    <el-input :placeholder="option.placeholder">
      <el-button
        slot="append"
        icon="el-icon-thumb"
        :close-on-click-modal="false"
        :show-close="false"
        @click="dialogVisible = true"
      >
        选择图标
      </el-button>
    </el-input>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible">
      <span>这是一段信息</span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'processIcons',
  props: {
    conf: Object,
    option: Object
  },
  data () {
    return {
      dialogVisible: false
    }
  }
}
</script>

<style>

</style>
