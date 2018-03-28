/**
 * Created by zhang on 2017/5/8.
 */
import * as types from './mutation-types';
export default {
  [types.GET_LIST](state) {
    console.log('执行了啊')
    state.list = [
      {title: '一三五七吧'},
      {title: '做个测试啦'},
      {title: '滚蛋你好吗'},
    ];
  },
 
}
