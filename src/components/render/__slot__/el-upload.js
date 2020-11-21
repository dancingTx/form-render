import { replaceEle } from '@/utils'
const genTips = function (h, currItem, key) {
  const tip = currItem.__slot__[key] && replaceEle(currItem.__slot__[key], currItem.__config__)
  return (<div slot={key} class="el-upload__tip">{tip}</div>)
}

export default {
  listType (h, currItem, key) {
    const config = currItem.__config__
    const res = []
    if (currItem.listType === 'picture-card' || currItem.drag) {
      res.push((<i slot="default" class="el-icon-plus" />))
    } else {
      res.push((
        <el-button
          size={config.btnSize || 'medium'}
          type={config.btnType || 'primary'}
        >
          {config.btnText || ''}
        </el-button>
      ))
    }

    if (config.showTips) {
      res.push(genTips(h, currItem, 'tip'))
    }
    return res
  }
}
