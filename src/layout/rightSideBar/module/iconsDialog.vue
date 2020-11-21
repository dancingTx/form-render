<template>
  <el-dialog
      :close-on-click-modal="false"
      :show-close="false"
      v-on="$listeners"
      v-bind="$attrs"
    >
      <template #title>
        <el-input
          placeholder="搜索图标"
          prefix-icon="el-icon-search"
          v-model="key"
        >
        </el-input>
        <span>选择图标</span>
      </template>
      <el-scrollbar>
        <ul class="icons">
          <li
            :class="['icons__item', (activeIcon === icon) && 'icons__item--active' ]"
            v-for="(icon, index) of searchList"
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
const icons = elementIcons.map(item => `el-icon-${item}`)
export default {
  name: 'iconsDialog',
  data () {
    return {
      activeIcon: '',
      key: '',
      searchList: icons
    }
  },
  watch: {
    key (value) {
      if (value) {
        this.searchList = icons.filter(item => item.indexOf(value) !== -1)
      }
    }
  },
  methods: {
    handleSelected (icon) {
      this.activeIcon = icon
      this.$emit('update:icon', icon)
      this.close()
    },
    close () {
      this.$emit('update:visible', false)
    }
  }
}
</script>
