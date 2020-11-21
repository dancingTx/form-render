<template>
  <div>
    <el-tabs v-model="activeName" :stretch="true">
      <el-tab-pane
        v-for="tab of tabs"
        :key="tab.name"
        :label="tab.label"
        :name="tab.name"
      />
    </el-tabs>
    <el-tooltip  effect="dark" content="查看组件文档" placement="top">
      <a
        class="right__link"
        :href="docLink"
        target="blank"
      >
        <i class="el-icon-link"/>
      </a>
    </el-tooltip>
    <el-scrollbar class="scrollbar">
      <component-attrs
        class="right__attrs"
        v-if="activeName === 'component'"
        :conf="activeData"
        :is-empty="isEmpty"
      />
      <form-attrs
        class="right__attrs"
        v-else-if="activeName === 'form'"
        :conf="formConf"
      />
    </el-scrollbar>
  </div>
</template>

<script>
import componentAttrs from './componentAttrs'
import formAttrs from './formAttrs'
const defaultLink = 'https://element.eleme.cn/#/zh-CN/component/installation'
export default {
  name: 'rightsidebar',
  components: {
    componentAttrs,
    formAttrs
  },
  props: {
    formConf: Object,
    activeData: Object,
    isEmpty: Boolean
  },
  computed: {
    docLink () {
      return this.activeData?.__config__?.document || defaultLink
    }
  },
  data () {
    return {
      tabs: [
        { label: '组件属性', name: 'component' },
        { label: '表单属性', name: 'form' }
      ],
      activeName: 'component'
    }
  }
}
</script>
