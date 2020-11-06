<script>
import render from '../render'
import draggable from 'vuedraggable'
import { labelWidth, typeOf } from '@/utils'
const stopPropagation = function (event, fn) {
  fn(...Array.from(arguments).slice(2))
  event.stopPropagation()
}
const btnGroup = function (h, currentItem, index, list) {
  const btns = [
    {
      title: '删除',
      icon: 'el-icon-delete',
      className: 'btns__delete btns',
      event: 'delete'
    },
    {
      title: '复制',
      icon: 'el-icon-copy-document',
      className: 'btns__copy btns',
      event: 'copy'
    }
  ]
  const executer = function (type) {
    return function () {
      return this[`${type}FormItem`](...arguments)
    }
  }
  const createComponentItem = item => {
    const fn = executer(item.event)
    return (
      <span
        class={item.className}
        title={item.title}
        onClick={event =>
          stopPropagation(event, fn.bind(this.$listeners), ...Array.from(arguments).slice(1))
        }
      >
        <i class={item.icon} />
      </span>
    )
  }
  return <div>{btns.map(createComponentItem)}</div>
}
const renderChildren = function (h, children) {
  if (!children) return <div />
  children = typeOf(children, 'array') ? children : [children]
  return children.map((currItem, index, list) => {
    const layout = layouts[currItem.__config__.layout]
    if (layout) {
      return layout.call(this, h, currItem, index, list)
    }
    return layouts.layoutIsNotFound.call(currItem)
  })
}
const layouts = {
  colFormItem (h, currentItem, index, list) {
    const { activeFormItem } = this.$listeners
    const config = currentItem.__config__
    const child = renderChildren.call(this, h, config.children)
    let className = `${
      config.formId === this.activeId ? 'draggable__item--active ' : ''
    }draggable__item`
    if (this.formConf.bluredComponentsBorder) {
      className += ' draggable__item--blur'
    }
    // 判断 form model中是否存在sub中的model
    const vModel = currentItem.__vModel__
      ? this.formConf.__vModel__[currentItem.__vModel__]
        ? currentItem.__vModel__
        : null
      : null
    return (
      <el-col
        span={config.span}
        offset={config.offset}
        push={config.push}
        pull={config.pull}
        class={className}
        nativeOnClick={event =>
          stopPropagation(event, activeFormItem, currentItem)
        }
      >
        <el-form-item
          prop={vModel}
          label={config.showLabel ? config.label : ''}
          label-width={labelWidth(config.labelWidth, config.showLabel)}
          required={config.required || false}
        >
          <render
            key={config.renderKey}
            currItem={currentItem}
            onInput={value => {
              this.$set(currentItem, '__vModel__', value)
            }}
          >
            {child}
          </render>
        </el-form-item>
        {btnGroup.apply(this, arguments)}
      </el-col>
    )
  },
  rowFormItem (h, currentItem, index, list) {
    const { activeFormItem } = this.$listeners
    const config = currentItem.__config__
    const child = renderChildren.call(this, h, config.children)
    const className = `${
      config.formId === this.activeId ? 'draggable-row__item--active ' : ''
    }draggable-row__item`

    return (
      <el-col span={config.span}>
        <el-row
          class={className}
          nativeOnClick={event =>
            stopPropagation(event, activeFormItem, currentItem)
          }
          gutter={config.gutter || 0}
          type={config.type || 'default'}
          justify={config.type === 'flex' ? config.justify : ''}
          align={config.type === 'flex' ? config.type : ''}
          tag={config.tag || 'div'}
        >
          <span class="draggable-row__title">{config.componentName}</span>
          <draggable
            group="components"
            animation={300}
            list={config.children || []}
          >
            {child}
          </draggable>
          {btnGroup.apply(this, arguments)}
        </el-row>
      </el-col>
    )
  },
  layoutIsNotFound () {
    throw new Error(`没有找到与${this.__config__.layout}匹配的layout`)
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
  components: {
    draggable,
    render
  },
  render (h) {
    const layout = layouts[this.currentItem.__config__.layout]
    if (layout) {
      return layout.call(
        this,
        h,
        this.currentItem,
        this.index,
        this.displayList
      )
    }
    return layouts.layoutIsNotFound.call(this.currentItem)
  }
}
</script>
