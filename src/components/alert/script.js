/**
 * Created by zhang on 2018/3/24.
 */
export default {
  name: 'alert',
  props: {
    content: {
      // type: String,
      default: ''
    },
    btn: {
      type: String,
      default: ''
    },
    visibleProp: {
      type: String,
      default: 'none'
    },
    closeProp: {
      type: Function,
    }
  },
  data() {
    return {
      visible: this.visibleProp,
    }
  },
  watch: {
    'visibleProp'(val) {
      if (this.visible !== val) {
        this.visible = val;
      }
    }
  },
  methods: {
    close() {
      this.visible = 'none';
      this.closeProp && this.closeProp();
    },
    destroyElement() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
  }
}
