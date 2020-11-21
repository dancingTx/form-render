<template>
  <div class="cascader__block">
    <el-divider>选项</el-divider>
    <el-form-item :label="type.label">
       <el-tree
        :data="conf[type.model]"
        node-key="id"
        :expand-on-click-node="false"
      >
        <div
          class="custom-tree-node"
          slot-scope="{ node, data }"
        >
          <span>{{ node.label }}</span>
          <span class="drag__btns">
            <i
              class="el-icon-circle-plus-outline"
              @click="addTreeNode(data)"
            />
            <i
              class="el-icon-remove-outline"
              @click="removeTreeNode(node, data)"
            />
          </span>
        </div>
      </el-tree>
    </el-form-item>
    <el-button
      icon="el-icon-circle-plus-outline"
      type="text"
      @click="addParentTreeNode"
    >
      添加父节点
    </el-button>
    <tree-node-dialog
      title="添加选项"
      :visible.sync="dialogVisible"
      @commit="addNode"
    />
  </div>
</template>

<script>
import treeNodeDialog from './treeNodeDialog'
export default {
  name: 'processCascader',
  components: {
    treeNodeDialog
  },
  props: {
    type: Object,
    conf: Object
  },
  data () {
    return {
      currNode: [],
      dialogVisible: false
    }
  },
  methods: {
    addNode (node) {
      this.currNode.push(node)
    },
    addTreeNode (data) {
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      this.currNode = data.children
      this.dialogVisible = true
    },
    removeTreeNode (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    addParentTreeNode () {
      this.currNode = this.conf.options
      this.dialogVisible = true
    }
  }
}
</script>
