export default {
  listType (h, currItem, key) {
    const config = currItem.__config__
    const tips = config.showTips && config.showTips.replace(/{(\w+)}/g, (_, value) => config[value])
    const res = []
    if (currItem.listType === 'picture-card') {
      res.push((
        <i slot="default" class="el-icon-plus"></i>
      ))
    } else {
      res.push((
        <el-button size={config.size} type={config.type}>{config.buttonText}</el-button>
      ))
    }

    if (config.showTips) {
      res.push((
        <div slot="tip" class="el-upload__tip">{tips}</div>
      ))
    }
  }
}
