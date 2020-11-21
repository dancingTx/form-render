<template>
  <div>
    <el-dialog
      v-bind="$attrs"
      v-on="$listeners"
      :close-on-click-modal="false"
      :show-close="false"
    >
    <el-row :gutter="0">
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="100px"
        >
        <el-form-item
          label="选项名"
          prop="label"
        >
          <el-input
            v-model="formData.label"
            placeholder="请输入选项名"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="选项值"
          prop="value"
        >
          <el-input
            v-model="formData.value"
            placeholder="请输入选项值"
            clearable
          >
            <el-select
              v-model="defaultType"
              placeholder="请选择"
              slot="append"
              :style="{width: '100px'}"
            >
              <el-option
                v-for="item in dataType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled || false"
              />
            </el-select>
          </el-input>
        </el-form-item>
      </el-form>
    </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'treeNodeDialog',
  data () {
    return {
      formData: {
        label: '',
        value: ''
      },
      rules: {
        label: [
          {
            required: true,
            message: '请输入选项名',
            trigger: 'blur'
          }
        ],
        value: [
          {
            required: true,
            message: '请输入选项值',
            trigger: 'blur'
          }
        ]
      },
      dataType: [
        { label: '字符串', value: 'string' },
        { label: '数字', value: 'number' }
      ],
      defaultType: 'string'
    }
  },
  watch: {
    'formData.value' (value) {
      this.defaultType = isNaN(Number(value)) ? 'string' : 'number'
    }
  },
  methods: {
    handleConfirm () {
      this.$refs.formRef.validate(valid => {
        if (!valid) return false
        if (this.defaultType === 'number') {
          this.formData.value = parseFloat(this.formData.value)
        }
        this.$emit('commit', this.formData)
        this.close()
      })
    },
    handleCancel () {
      this.close()
      this.$refs.formRef.resetFields()
    },
    close () {
      this.$emit('update:visible', false)
      // reset data
      this.formData = {
        label: '',
        value: ''
      }
    }
  }
}
</script>
