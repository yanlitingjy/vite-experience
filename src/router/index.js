import { createWebHashHistory, createRouter } from 'vue-router'

const routes = [
    {
        path: '/home', // 路由的路径
        name: 'home', // 路由的名称
        component: () => import('../components/home.vue'), // 路由的组件
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../components/about.vue'),
    },
]

// 创建路由实例并传递 `routes` 配置
const router = createRouter({
    history: createWebHashHistory(), // 内部提供了 history 模式的实现，这里使用 hash 模式
    routes
});
export default router