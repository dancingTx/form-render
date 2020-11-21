<script>
import componentAttrs from './componentAttrs'
import { formOptions } from '@/components/generate/__attrs__'
export default {
  name: 'formAttrs',
  components: { componentAttrs },
  props: {
    conf: Object
  },
  render (h) {
    return <componentAttrs conf={this.conf} isEmpty={false} formOptions={formOptions}/>
  }
}
</script>
