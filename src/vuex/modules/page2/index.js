import * as types from '../../mutation-types';
import actions from './actions';
import mutations from './mutations';
export default {
  state: {
   list: []
  },
  mutations,
  getters: {
     // helloText(state) {
     //    return 'hello' + state.count;
     // }
  },
  actions,
};
