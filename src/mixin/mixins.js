/**
 * Created by zhang on 2017/5/8.
 */
// import { cancelFetches } from '../common/request'
export default {
  destroyed() {
    if (this.$options.CancelAllRequest) {
      console.log('在这里把所有未完成的请求给cancel掉啦');
    }

    // cancelFetches();

  },
  created() {
    if (this.$options.isPage) {
      console.log('创建了一个组件');
    }

    }

}
