import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/join',
    component: () => import('@/views/join/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '仪表盘', icon: 'dashboard' }
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/home',
    name: 'user',
    meta: {
      title: '用户',
      icon: 'el-icon-user'
    },
    children: [
      {
        path: 'home',
        component: () => import('@/views/user/home/index'),
        name: 'user_home',
        meta: { title: '主页', icon: 'el-icon-s-home' }
      },
      {
        path: 'profile',
        component: () => import('@/views/user/profile/index'),
        name: 'user_profile',
        meta: { title: '配置', icon: 'el-icon-setting' }
      }
    ]
  },
  {
    path: '/anime',
    component: Layout,
    redirect: '/anime/list',
    name: 'anime',
    meta: {
      title: '动漫',
      icon: 'el-icon-star-on'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/anime/list/index'),
        name: 'anime_list',
        meta: { title: '列表', icon: 'table' }
      },
      {
        path: 'index',
        component: () => import('@/views/anime/index/index'),
        name: 'anime_index',
        meta: { title: '引索', icon: 'table' }
      },
      {
        path: 'search',
        component: () => import('@/views/anime/search/index'),
        name: 'anime_search',
        meta: { title: '搜索', icon: 'el-icon-search' }
      },
      {
        path: 'add',
        component: () => import('@/views/anime/add/index'),
        name: 'anime_add',
        meta: { title: '添加', icon: 'form' }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/anime/edit/index'),
        name: 'anime_edit',
        meta: { title: '编辑', icon: 'form' },
        hidden: true
      },
      {
        path: 'detail/:id',
        component: () => import('@/views/anime/detail/index'),
        name: 'anime_detail',
        meta: { title: '详情', icon: 'table' },
        hidden: true
      }
    ]
  },
  {
    path: '/link',
    component: Layout,
    redirect: '/link/list',
    name: 'link',
    meta: {
      title: '链接',
      icon: 'el-icon-link'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/link/list/index'),
        name: 'link_list',
        meta: { title: '列表', icon: 'table' }
      },
      {
        path: 'sublink',
        component: () => import('@/views/link/sublink/index'), // Parent router-view
        name: 'link_sublink',
        redirect: '/link/sublink/list',
        meta: { title: '子链', icon: 'el-icon-link' },
        children: [
          {
            path: 'list',
            component: () => import('@/views/link/sublink/list/index'),
            name: 'link_sublink_list',
            meta: { title: '列表', icon: 'table' }
          },
          {
            path: 'index',
            component: () => import('@/views/link/sublink/index/index'),
            name: 'link_sublink_index',
            meta: { title: '引索', icon: 'table' }
          },
          {
            path: 'add',
            component: () => import('@/views/link/sublink/add/index'),
            name: 'link_sublink_add',
            meta: { title: '添加', icon: 'form' }
          },
          {
            path: 'edit/:id',
            component: () => import('@/views/link/sublink/edit/index'),
            name: 'sublink_edit',
            meta: { title: '编辑', icon: 'form' },
            hidden: true
          }
        ]
      },
      {
        path: 'add',
        component: () => import('@/views/link/add/index'),
        name: 'link_add',
        meta: { title: '添加', icon: 'form' }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/link/edit/index'),
        name: 'link_edit',
        meta: { title: '编辑', icon: 'form' },
        hidden: true
      },
      {
        path: 'detail/:id',
        component: () => import('@/views/link/detail/index'),
        name: 'link_detail',
        meta: { title: '详情', icon: 'table' },
        hidden: true
      }
    ]
  },

  {
    path: 'link',
    component: Layout,
    meta: { title: '关于', icon: 'link' },
    children: [
      {
        path: 'https://injahow.com',
        meta: { title: '博客', icon: 'link' }
      },
      {
        path: 'https://github.com/injahow',
        meta: { title: 'GitHub', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
