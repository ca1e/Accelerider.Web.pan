import NotFound from '@/views/404.vue'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Disk from '@/views/Disk'
import DDisk from '@/views/disk/BDDisk'
import Square from '@/views/Square'
import About from '@/views/About'

const Register = ()=>import('@/views/Register')
const DM4s = ()=>import('@/views/disk/M4sDisk')
const DOneDrive = ()=>import('@/views/disk/OneDriveDisk')

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
              iconCls: 'el-icon-edit'
            },
            {
              path: 'onedrive',
              name: 'onedrive',
              hidden: true,
              component: DOneDrive,
              iconCls: 'el-icon-document'
            }
          ]
        },
        {
          path: '/square',
          name: '广场',
          component: Square,
          iconCls: 'el-icon-share'
        },
        {
          path: '/about',
          name: '关于',
          component: About,
          iconCls: 'el-icon-info'
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