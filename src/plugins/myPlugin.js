/**
 * Created by zhang on 2018/3/24.
 */
import destroyedMixin from '../mixin/mixins';
import alert from '../components/alert/alert.js';
let myPlugin = {};
myPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 一些逻辑……
    console.log('添加全局的方法')
  }

  // 2. 添加一个全局资源(asset)
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 一些逻辑……
    }
  })

  // 3. 注入一些组件选项
  Vue.mixin({...destroyedMixin});

  // 4. 添加一个实例方法
  Vue.prototype.$alert = alert;
}

export default myPlugin;
