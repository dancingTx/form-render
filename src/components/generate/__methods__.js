import { firstUpperCase } from '@/utils'
const genHandle = methodName => 'handle' + firstUpperCase(methodName)
const methodsName = {
  submitForm: genHandle('submitForm'),
  resetForm: genHandle('resetForm'),
  beforeUpload: genHandle('beforeUpload'),
  submitUpload: genHandle('submitUpload')
}

export default methodsName
