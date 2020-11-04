export default {
  methods: {
    $_resize () {
      // TODO: 节流
      this.$store.dispatch('drawer/processResizeHandler', {
        key: 'resize',
        value: Date.now()
      })
    }
  },
  mounted () {
    window.addEventListener('resize', this.$_resize, false)
  },
  destroy () {
    window.removeEventListener('resize', this.$_resize, false)
  }
}
