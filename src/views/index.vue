<template>
  <div class="container">
    <!-- left panel -->
    <div class="container__left">
      <logo/>
      <el-scrollbar class="scrollbar">
        <div class="components__list">
          <div class="components__item"
            v-for="({title, type, list}) of componentsList"
            :key="type"
          >
            <div class="components__title">
              <svg-icon class="title__icon" icon-class="component" />
              <h4 class="title__content">{{title}}</h4>
            </div>
            <div class="components__body">
              <draggable
                :list="list"
                :group="dragGroup"
                :sort="false"
                :clone="cloneComponents"
                draggable=".components__btns"
                :animation="300"
                @end="handleDragEnd"
              >
                <div
                  class="components__btns"
                  v-for="(component, index) of list"
                  :key="index"
                  @click="addComponent(component)"
                >
                  <svg-icon class="btns__icon" :icon-class="component.__config__.tagIcon" />
                  <span class="btns__content">{{component.__config__.label}}</span>
                </div>
              </draggable>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <!-- body -->
    <div class="container__main">
      <btn-group/>
      <el-scrollbar class="scrollbar">
        <el-row :gutter="formConf.gutter">
          <el-col :span="formConf.span">
            <el-form
              :ref="formConf.formRef"
              :label-width="formConf.labelWidth | labelWidth"
              :label-position="formConf.labelPosition"
              :inline="formConf.inline"
              :hide-required-asterisk="formConf.required"
              :size="formConf.size"
              :disabled="formConf.disabled"
            >
              <draggable
                class="canvas__block"
                :list="displayList"
                :group="dragGroup.name"
                :animation="300"
              >
                    <draggable-item
                      class="draggable__item"
                      v-for="(item, index) of displayList"
                      :key="index"
                      :currentItem="item"
                      :index="index"
                      :displayList="displayList"
                      :formConf="formConf"
                      :activeId="activeId"
                      @activeFormItem="activeFormItem"
                      @copyFormItem="copyFormItem"
                      @deleteFormItem="deleteFormItem"
                    />

              </draggable>
              <h2
                class="canvas__empty"
                v-show="!displayList.length"
                >
                  从左侧拖入或点击组件添加至画布
              </h2>
            </el-form>
            </el-col>
          </el-row>
      </el-scrollbar>
    </div>
    <!-- right panel -->
    <div class="container__right">
      <right-side-bar
        :active-data="activeData"
        :form-conf="formConf"
        :is-empty="!displayList.length"
      />
    </div>
    <!-- drawer -->
    <div class="container__drawer">
      <el-drawer
        class="drawer__wrapper"
        size="100%"
        :visible.sync="isShowing"
        direction="rtl"
        append-to-body
        :withHeader="false"
        @open="handleDrawerOpen"
        >
        <preview @exec="executer" />
      </el-drawer>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { logo, btnGroup, rightSideBar } from '@/layout'
import { DraggableItem, Preview } from '@/components'
import genCodeStr from '@/components/generate'
import { deepCopy, typeOf, firstUpperCase, labelWidth } from '@/utils'
export const draggableName = 'componentGroup'
let fid = 0
export default {
  name: 'index',
  components: { draggable, DraggableItem, Preview, rightSideBar, logo, btnGroup },
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
  watch: {
    directive (value) {
      this.executer(value)
    }
  },
  data () {
    return {
      isShowing: false,
      dragGroup: {
        name: draggableName,
        pull: 'clone',
        put: false
      },
      displayList: [],
      tempData: {},
      activeData: {},
      activeId: 0
    }
  },
  filters: {
    labelWidth (value) {
      return labelWidth(value)
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
      let vModel = clone.__vModel__
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
          if (typeOf(vModel, 'undefined')) {
            vModel = `fields${fid}`
          }
          break
      }
      if (typeOf(config.children, 'array')) {
        config.children = config.children.map(this.createRenderKey)
      }
      return clone
    },

    activeFormItem (item) {
      // actived form item
      this.activeData = item
      this.activeId = item.__config__.formId
    },
    copyFormItem (item, index, list) {
      // clone form item
      const clone = this.cloneComponents(item)
      this.activeFormItem(clone)
      list.push(clone)
    },
    deleteFormItem (item, index, list) {
      // delete form item
      list.splice(index, 1)
      this.$nextTick(() => {
        const length = list.length
        if (length) {
          this.activeFormItem(list[length - 1])
        }
      })
    },
    executer (type) {
      type && this[`execute${firstUpperCase(type)}Func`]()
      this.resetDirective()
    },
    resetDirective () {
      // reset exec
      this.$store.dispatch('executeComponentDirective', {
        key: 'directive',
        value: ''
      })
    },
    executeRunFunc () {
      // display drawer
      this.isShowing = true
      // run code
    },
    executeClosedFunc () {
      this.isShowing = false
    },
    executeClearFunc () {
      this.$confirm('此操作将清空画布, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.displayList = []
        this.$message({
          type: 'success',
          message: '清空成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    handleDrawerOpen () {
      genCodeStr(this.displayList, this.formConf)
    }
  }
}
</script>
