const genTips = function (h, currItem, key) {
  const tip =
    currItem.__slot__[key] &&
    currItem.__slot__[key].replace(/{(\w+)}/g, (_, value) => currItem.__config__[value])
  return (
    <div slot={key} class="el-upload__tip">{tip}</div>
  )
}

export default {
  listType (h, currItem, key) {
    const config = currItem.__config__
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
      res.push(genTips(h, currItem, 'tip'))
    }
    return res
  }
}
