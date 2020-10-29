<template>
  <div class="container">
    <!-- left panel -->
    <div class="container__left">
      <el-scrollbar class="scrollbar">
        <el-switch v-model="sort" active-text="可排序" class="left__switch"/>
        <div class="components__list">
          <div class="components__item" v-for="({title, type, list}) of componentsList" :key="type">
            <div class="components__title">
              <svg-icon icon-class="component" class="components__title_icon"/>
              <h4 class="components__title_content">{{title}}</h4>
            </div>
            <div class="components__body">
              <draggable
                :list="list"
                :group="dragGroup"
                :clone="cloneComponents"
                :sort="sort"
                draggable=".components__btns"
                @end="handleDragEnd"
              >
                <div
                  class="components__btns"
                  v-for="(component, index) of list"
                  :key="index"
                  @click="addComponent(component)"
                >
                  <svg-icon :icon-class="component.__config__.tagIcon" class="components__btns_icon"/>
                  <span class="components__btns_content">{{component.__config__.label}}</span>
                </div>
              </draggable>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <!-- body -->
    <div class="container__main">
      <el-scrollbar class="scrollbar">
        <el-row :gutter="formConf.gutter">
          <el-form
            :ref="formConf.formRef"
            v-model="formConf.__vModel__"
            :label-width="formConf.labelWidth | labelWidth"
            :label-position="formConf.labelPosition"
            :inline="formConf.inline"
            :hide-required-asterisk="formConf.required"
            :size="formConf.size"
            :disabled="formConf.disabled"
          >
            <draggable
              class="container__board"
              :list="displayList"
              :group="dragGroup.name"
              :animation="300"
            >
            </draggable>
          </el-form>
        </el-row>
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
import draggable from 'vuedraggable'
import { deepCopy, typeOf, firstUpperCase } from '@/utils'

let fid = 0
export default {
  name: 'index',
  components: { draggable },
  computed: {
    componentsList () {
      return this.$store.getters.components
    },
    formConf () {
      return this.$store.getters.formConf
    },
    directive () {
      return this.$store.getters.directive
    }
  },
  filters: {
    labelWidth (value) {
      return typeOf(value, 'number') ? value + 'px' : value
    }
  },
  watch: {
    directive (value) {
      this.executer(value)
    }
  },
  data () {
    return {
      sort: false,
      dragGroup: {
        name: 'components',
        pull: 'clone',
        put: false
      },
      displayList: [],
      tempData: {},
      activeData: {},
      activeId: 0
    }
  },
  methods: {
    handleDragEnd (event) {
      if (event.from === event.to) return
      this.activeData = this.tempData
      this.activeId = fid
    },
    addComponent (item) {
      const clone = this.cloneComponents(item)
      this.activeFormItem(clone)
      this.displayList.push(clone)
    },
    cloneComponents (original) {
      const clone = deepCopy(original)
      // 更改配置
      this.addCustomOptions(clone)
      // 创建标志位
      this.createRenderKey(clone)

      this.tempData = clone
      return clone
    },
    addCustomOptions (clone) {
      const config = clone.__config__
      config.span = config.span || this.formConf.span
      if (clone.placeholder) {
        clone.placeholder += config.label
      }
    },
    createRenderKey (clone) {
      const config = clone.__config__
      config.formId = ++fid
      config.renderKey = `${fid}_${Date.now()}`

      switch (config.layout) {
        case 'rowFormItem':
          config.componentName = `row_${fid}`
          this.$delete(config, 'label')
          config.children =
            config.children ? typeOf(config.children, 'array') ? config.children : [config.children] : []
          break
        default:
          clone.__vModel__ = clone.__vModel__ || `fields${fid}`
          break
      }
      if (typeOf(config.children, 'array')) {
        config.children = config.children.map(this.createRenderKey)
      }
      return clone
    },
    activeFormItem (item) {
      this.activeData = item
      this.activeId = item.__config__.formId
    },
    executer (type) {
      return this[`execute${firstUpperCase(type)}Func`]()
    },
    executeRunFunc () {
      console.log('runnnnnn')
    },
    executeClearFunc () {
      console.log('clearrrrr')
    }
  }
}
</script>
