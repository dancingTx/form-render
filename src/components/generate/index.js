import genTemplate from './template'
const genCodeStr = function (fields, formConf) {
  return {
    template: genTemplate(fields, formConf)
  }
}

export default genCodeStr
