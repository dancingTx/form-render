<script>
export default {
  name: 'btnGroup',
  render () {
    const btnGroup = [
      { icon: 'el-icon-video-play', directive: 'run', content: '运行' },
      { icon: 'el-icon-delete', directive: 'clear', content: '清空' }
    ]
    const handleClick = type => {
      this.$store.dispatch('executeComponentDirective', {
        key: 'directive',
        value: type
      })
    }
    const createBtnItem = item => {
      return (
        <div
          class="btngroup__item"
          onClick={ () => handleClick(item.directive) }
        >
          <i class={`${item.icon} btngroup__icon`} />
          <span class='btngroup__content'>{ item.content }</span>
        </div>
      )
    }
    return (
      <div class="btngroup">
        <div class="btngroup__inner">{ btnGroup.map(createBtnItem) }</div>
      </div>
    )
  }
}
</script>
