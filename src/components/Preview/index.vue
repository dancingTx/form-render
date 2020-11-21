<template>
  <div class="preview">
    <div class="preview__editor">
      <div class="editor__tabs">
        <el-tabs
          class="tabs__block"
          v-model="activeName"
          type="card"
        >
          <el-tab-pane
            v-for="tab of tabs"
            :key="tab.name"
            :label="tab.label"
            :name="tab.name"
          >
            <span slot="label">
              <i v-if="activeName === tab.name" class="el-icon-edit tabs__icon"/>
              <i v-else class="el-icon-document tabs__icon" />
              <span class="tabs__label">{{tab.label}}</span>
            </span>
          </el-tab-pane>
        </el-tabs>
        <monaco
          class="editor__content"
          :code="code"
          :activeName="activeName"
          :change.sync="editorValue"
        />
      </div>
    </div>
    <div class="preview__display">
      <div class="display__btns">
        <div
          class="btngroup__item"
          v-for="btn of btns"
          :key="btn.icon"
          @click="handleClick(btn.directive)"
        >
          <i :class="['btngroup__icon', btn.icon]" />
          <span class='btngroup__content'>{{btn.label}}</span>
        </div>
      </div>
      <display :code="preview"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import display from './display'
import monaco from './monaco'
import { firstUpperCase, isPlainObject } from '@/utils'
import { genTemplateViaVue, genScriptViaVue, genStyleViaVue } from '../generate/index'
import genStyle from '../generate/style'
export default {
  name: 'Preview',
  components: {
    display,
    monaco
  },
  props: {
    codeObj: Object
  },
  watch: {
    editorValue (value) {
      // watch content change via monaco editor
      this.displayCode(this.codeObj, value)
    },
    activeName (type) {
      this.editCode(this.codeObj, type)
    },
    codeObj (value) {
      this.displayCode(value)
    }
  },
  data () {
    return {
      code: '', // 编辑区字符串
      preview: '', // 视图区字符串
      editorValue: '', // 编辑editor 返回值
      activeName: 'html',
      tabs: [
        { label: 'template', name: 'html' },
        { label: 'style', name: 'css' },
        { label: 'script', name: 'javascript' }
      ],
      btns: [
        { label: '运行', icon: 'el-icon-video-play', directive: 'run' },
        { label: '关闭', icon: 'el-icon-close', directive: 'closed' }
      ]
    }
  },
  methods: {
    handleClick (directive) {
      if (directive === 'closed') {
        this.$emit('exec', directive)
        return
      }
      //
      directive && this[`execute${firstUpperCase(directive)}Func`]()
    },
    executeRunFunc () {

    },
    displayCode (codeObj, editorValue) {
      let template = ''
      const { vueTemplate, vueScript, vueStyle } = codeObj
      if (editorValue) {
        switch (this.activeName) {
          case 'html':
            codeObj.template = editorValue
            template = genTemplateViaVue(editorValue) + vueScript + vueStyle
            break
          case 'css':
            codeObj.style = editorValue
            template = vueTemplate + vueScript + genStyleViaVue(editorValue)
            break
          case 'javascript':
            codeObj.script = editorValue
            template = vueTemplate + genScriptViaVue(editorValue) + vueStyle
            break
          default:
            break
        }
      } else {
        this.editCode(codeObj, this.activeName)
        template = vueTemplate + vueScript + vueStyle
      }
      this.preview = template
    },
    editCode (codeObj, type) {
      const { template, script, style } = codeObj
      const codes = {
        html: template,
        css: style,
        javascript: script
      }
      this.code = codes[type || 'html']
    }
  },
  mounted () {
    this.displayCode(this.codeObj)
  }
}
</script>
