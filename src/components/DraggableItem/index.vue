<script>
import { labelWidth } from '@/utils'
const btnGroup = function (h, currentItem, index, list) {
  const btns = [
    { title: '复制', icon: 'el-icon-copy-document', className: 'btngroup__copy', event: 'copy' },
    { title: '删除', icon: 'el-icon-delete', className: 'btngroup__delete', event: 'delete' }
  ]
  const executer = function (type) {
    return function () {
      return this[`${type}FormItem`](...arguments)
    }
  }
  const createComponentItem = item => {
    const event = executer(item.event)
    return (
      <span
        class={item.className}
        title={item.title}
        onClick={() => event.apply(this.$listeners, Array.from(arguments).slice(1))}
      >
        <i class={item.icon}/>
      </span>
    )
  }
  return (<div>{btns.map(createComponentItem)}</div>)
}
const stopPropagation = function (event, fn) {
  fn(...Array.from(arguments).slice(2))
  event.stopPropagation()
}

// eslint-disable-next-line no-unused-vars
const layouts = {
  colFormItem (currentItem, index, list) {
    const { activeFormItem } = this.$listeners
    const config = currentItem.__config__
    let className = `${config.formId === this.activeId ? 'draggable__item--active ' : ''}'draggable__item`
    if (this.formConf.bluredComponentsBorder) className += ' draggable__item--blur'
    // 判断 form model中是否存在sub中的model
    const vModel = currentItem.__vModel__ ? this.formConf.__vModel[currentItem.__vModel__] ? this.formConf.__vModel[currentItem.__vModel__] : null : null
    return (
      <el-col
        span={config.span}
        offset={config.offset}
        push={config.push}
        pull={config.pull}
        class={className}
        nativeOnClick={event => stopPropagation(event, activeFormItem, currentItem)}
      >
        <el-form-item
          v-model={vModel}
          label-width={labelWidth(config.labelWidth, config.showLabel)}
        ></el-form-item>
      </el-col>
    )
  }
}
export default {
  name: 'DraggableItem',
  props: {
    currentItem: {
      type: Object,
      deafult: () => {}
    },
    index: {
      type: Number,
      default: -1
    },
    displayList: {
      type: Array,
      default: () => []
    },
    activeId: {
      type: Number,
      default: -1
    },
    formConf: {
      type: Object,
      default: () => {}
    }
  },
  render (h) {
    return btnGroup.call(this, h, this.currentItem, this.index, this.displayList)
  }
}

</script>
