/**
 * Created by zhang on 2017/3/28.
 */
const component = resolve => require(['./index.vue'], resolve);

export default [{
    path: '/',
    name: 'hello',
    meta: {
        title: '项目主页',
    },
    component,
}]
