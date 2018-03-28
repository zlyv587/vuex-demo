/**
 * Created by zhang on 2017/5/8.
 */
import mixins from '../../mixin/mixins'
import {mapState, mapActions, mapGetters} from 'vuex';
import helloService from '../../api/hello';
import unique from '../../components/unique'
export default {
  isPage: true,
  name: 'hello',
  components: {unique},
  computed: {
    msf() {
      return this.msg + 'fewafewafewa';
    },
    ...mapGetters({
      helloText: 'helloText',
    }),
    ...mapState({
      page2: 'page2',
      hello: 'hello',
      list({page2}) {
        return page2.list;
      },
      count({hello}) {
        return hello.count;
      }
    })
  },
  methods: {
    ...mapActions([
      'changeCount',
      'sayHello',
      'getList'
    ]),
    goHello() {
      this.$router.push('/');
    }
  },
  created() {
    console.log(333333333333333333333);
    // this.changeCount();
    this.getList();
  },
  mounted() {
  },
  data () {
    return {
      content: {
        text: '短袖',
        children: {
          text: '裙子',
          children: {
            text: '帽子'
          }
        }
      }
    }
  }
}
