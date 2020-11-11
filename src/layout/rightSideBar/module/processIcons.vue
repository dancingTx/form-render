<template>
  <div class="item">
    <el-input :placeholder="option.placeholder">
      <el-button
        slot="append"
        icon="el-icon-thumb"
        @click="dialogVisible = true"
      >
        选择图标
      </el-button>
    </el-input>
    <icons-dialog :visible.sync="dialogVisible"/>
  </div>
</template>

<script>
import iconsDialog from './iconsDialog'
export default {
  name: 'processIcons',
  components: {
    iconsDialog
  },
  props: {
    conf: Object,
    option: Object
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
  }
}
</script>

<style>

</style>
