import NotFound from '@/views/404.vue'
import Register from '@/views/Register'
import Login from '@/views/Login'
import Home from '@/views/Home'

import Disk from '@/views/Disk'
import DDisk from '@/views/disk/BDDisk'
import DM4s from '@/views/disk/M4sDisk'
import DOneDrive from '@/views/disk/OneDriveDisk'
import Square from '@/views/Square'
import About from '@/views/About'

const routers = {
  // mode:'history',
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/signup',
      component: Register
    },
    {
      path: '/',
      component: Home,
      redirect: { path: '/disk' },
      meta: { requiresAuth: true },
      children: [
        {
          path: '/disk',
          name: '网盘',
          component: Disk,
          iconCls: 'el-icon-menu',
          redirect: { path: '/disk/home' },
          children: [
            {
              path: 'home',
              name: '百度云',
              component: DDisk,
              iconCls: 'el-icon-upload'
            },
            {
              path: 'm4s',
              name: '坐骑云',
              component: DM4s,
              iconCls: 'el-icon-document'
            },
            {
              path: 'onedrive',
              name: 'onedrive',
              hidden: true,
              component: DOneDrive,
              iconCls: 'el-icon-edit'
            }
          ]
        },
        {
          path: '/square',
          name: '广场',
          component: Square,
          iconCls: 'el-icon-view'
        },
        {
          path: '/about',
          name: '关于',
          component: About,
          iconCls: 'el-icon-information'
        }
      ]
    },
    {
      path: '/404',
      component: NotFound
    },
    {
      path: '*',
      redirect: { path: '/404' }
    }
  ]
}

export default routers