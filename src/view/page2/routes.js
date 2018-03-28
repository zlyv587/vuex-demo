/**
 * Created by zhang on 2017/3/28.
 */
const component = resolve => require(['./index.vue'], resolve);

export default [{
    path: '/page2',
    name: 'page2',
    meta: {
        title: '第二个页面',
    },
    component,
}]
