import Vue from 'vue';
import alertOptions from './index.vue';
import {isVNode} from '../../common/vdom';

const alertConstructor = Vue.extend(alertOptions);

let instance;

export default function alert(option) {
  if (instance) {
    instance.vm.destroyElement();
  }
  instance = new alertConstructor({
    propsData: {
      ...option
    }
  });
  const closeFun = instance.close;
  instance.close = function () {
    closeFun();
    instance.destroyElement();
  }
  if (isVNode(instance.content)) {
    instance.$slots.default = [instance.content];
    instance.content = null;
  } else {
    delete instance.$slots.default;
  }
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = 'block';
}


