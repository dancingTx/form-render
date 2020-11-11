<template>
  <el-dialog
      title="选择图标"
      :close-on-click-modal="false"
      :show-close="false"
      v-on="$listeners"
      v-bind="$attrs"
      :visible.sync="dialogVisible"
    >
      <el-scrollbar>
        <ul class="icons">
          <li
            :class="['icons__item', (activeIcon === icon) && 'icons__item--active' ]"
            v-for="(icon, index) of elementIcons"
            :key="index"
            @click="handleSelected(icon)"
          >
            <i :class="icon"/>
            <div>{{icon}}</div>
          </li>
        </ul>
      </el-scrollbar>
    </el-dialog>
</template>

<script>
import elementIcons from '@/icons/__icons__'
export default {
  name: 'iconsDialog',
  computed: {
    elementIcons () {
      return elementIcons.map(item => `el-icon-${item}`)
    }
  },
  data () {
    return {
      activeIcon: ''
    }
  },
  methods: {
    handleSelected (icon) {
      this.activeIcon = icon
      this.dialogVisible = false
    }
  }
}
</script>
