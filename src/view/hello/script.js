/**
 * Created by zhang on 2017/5/8.
 */
import mixins from '../../mixin/mixins'
import {mapState, mapActions, mapGetters} from 'vuex';
import helloService from '../../api/hello';
import alert from '../../components/alert'
export default {
  isPage: true,
  name: 'hello',
  components: {alert},
  computed: {
    msf() {
      return this.msg + 'fewafewafewa';
    },
    ...mapGetters({
      helloText: 'helloText',
    }),
    ...mapState({
      hello: 'hello',
      count({hello}) {
        return hello.count;
      },
    })
  },
  methods: {
    ...mapActions([
      'changeCount',
      'sayHello'
    ]),
    closeProp() {
      this.visibleProp = 'none';
    }
  },
  mounted() {
    this.changeCount();
    // helloService.getHello().then()
    this.visibleProp = 'block';
    for (let i = 0; i < 9; i++) {
      this.$alert({content:this.$createElement(
        'span',// tag name 标签名称
        'fewafeawf' // 子组件中的阵列
      )})
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      visibleProp: 'none'
    }
  }
}
