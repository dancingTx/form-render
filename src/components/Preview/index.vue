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
      <display :code="code" />
    </div>
  </div>
</template>

<script>

import display from './display'
import monaco from './monaco'
import { template } from './testTemplate'

export default {
  name: 'Preview',
  components: {
    display,
    monaco
  },
  watch: {
    editorValue (value) {
    }
  },
  data () {
    return {
      code: template,
      activeName: 'html',
      tabs: [
        { label: 'template', name: 'html' },
        { label: 'style', name: 'css' },
        { label: 'script', name: 'javascript' }
      ],
      editorValue: ''
    }
  }
}
</script>
