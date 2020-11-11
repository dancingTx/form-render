<template>
  <div class="item">
    <el-input :placeholder="option.placeholder" :value="activeIcon">
      <el-button
        slot="append"
        icon="el-icon-thumb"
        @click="dialogVisible = true"
      >
        选择
      </el-button>
    </el-input>
    <icons-dialog :visible.sync="dialogVisible" :icon.sync="activeIcon"/>
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
  watch: {
    activeIcon (icon) {
      this.conf[this.option.model || 'icon'] = icon
    }
  },
  data () {
    return {
      dialogVisible: false,
      activeIcon: ''
    }
  },
  methods: {
  }
}
</script>

<style>

</style>
