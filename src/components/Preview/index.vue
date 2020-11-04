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
        <div
          class="editor__content"
          v-for="tab of tabs"
          :key="tab.name"
          :ref="tab.label"
          v-show="activeName === tab.name"
        />
      </div>
    </div>
    <div class="preview__display">
      <display :code="code"/>
    </div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor'
import display from './display.vue'
import { template } from './testTemplate'
export default {
  name: 'Preview',
  components: {
    display
  },
  data () {
    return {
      code: template,
      editor: {
        template: null,
        style: null,
        script: null
      },
      activeName: 'html',
      tabs: [
        { label: 'template', name: 'html' },
        { label: 'style', name: 'css' },
        { label: 'script', name: 'javascript' }
      ]
    }
  },
  methods: {
    createAndUpdateEditorValue (ref, type, code) {
      if (this.editor[ref]) {
        this.editor[ref].setValue(code)
        return
      }
      this.editor[ref] = monaco.editor.create(this.$refs[ref][0], {
        value: code,
        language: type,
        theme: 'vs-dark',
        automaticLayout: true
      })
    }
  },
  mounted () {
    this.createAndUpdateEditorValue('script', 'javascript', this.code)
  }
}
</script>
