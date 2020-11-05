import { throttle } from '@/utils'
import { edit } from '@/components/Preview/monaco'
export default {
  methods: {
    $_resize () {
      edit && edit.layout()
    }
  },
  mounted () {
    window.addEventListener('resize', throttle(this.$_resize, 300), false)
  },
  destroy () {
    window.removeEventListener('resize', this.$_resize, false)
  }
}
