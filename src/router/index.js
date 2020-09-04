import Vue from 'vue';
import Router from 'vue-router';

const _import = require('./_import_development');

/* 按需加载 */
const Layout = r => require.ensure([], () => r(require('@/views/layout.vue')), 'chunkname1');
const Table = r => require.ensure([], () => r(require('@/views/Table.vue')), 'chunkname1');
const TableList = r => require.ensure([], () => r(require('@/views/tableList.vue')), 'chunkname1');
const List = r => require.ensure([], () => r(require('@/views/list.vue')), 'chunkname2');
const Review = r => require.ensure([], () => r(require('@/views/review.vue')), 'chunkname2');
const NameList = r => require.ensure([], () => r(require('@/views/nameList.vue')), 'chunkname2');
const TipList = r => require.ensure([], () => r(require('@/views/tipList.vue')), 'chunkname2');

/* 同步加载 */
// const Table = _import('Table@brain');
// const Index = _import('index@brainone');

Vue.use(Router);

export const constantRouterMap = [
    {path: '', redirect: '/tableList'},
    //type add:新增表单， edit: 编辑表单，
    {
        path: '/layout', component: Layout, hidden: true, name: '1',
        children: [
            {path: '/form/:type', component: Table, hidden: true, name: '2'},
            {path: '/tableList', component: TableList, hidden: true, name: '1'},
            {path: '/model/list', component: List, hidden: true},
            {path: '/review', component: Review, hidden: true, name: '1'},
            {path: '/nameList', component: NameList, hidden: true, name: '3'},
            {path: '/tipList', component: TipList, hidden: true, name: '4'},
        ]
    },
];

export default new Router({
    mode: 'hash',
    linkActiveClass: 'open active',
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
});