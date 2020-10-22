
import EmptyLayout from "@/components/layouts/EmptyLayout";

/*
  路由规则：
  1.子路由如果只有一个那么会直接进入子路由，>=2个的时候，侧边栏才会出现下拉
*/

// 含有menu和侧边栏的框架
// import Layout from "@/components/layouts";
const Layout = () => import(/* webpackChunkName: "layouts" */ '@/components/layouts') // webpack的魔法注释，将拆分出的js命名为layouts

// 真实内容
// 首页系列
const Home = () => import(/* webpackChunkName: "home" */ '../views/home/index.vue') // webpack的魔法注释，将拆分出的js命名为Home


// 小组管理系列
const GroupIndex = () => import(/* webpackChunkName: "index" */ '../views/group/index/index.vue') // webpack的魔法注释，将拆分出的js命名为index
const groupCreate = () => import(/* webpackChunkName: "create" */ '../views/group/index/create.vue') // webpack的魔法注释，将拆分出的js命名为create
const groupMember = () => import(/* webpackChunkName: "groupMember" */ '../views/group/index/groupMember.vue') // webpack的魔法注释，将拆分出的js命名为groupMember


// 动态管理系列
const groupTrends = () => import(/* webpackChunkName: "trends" */ '../views/group/trends/trends.vue') // webpack的魔法注释，将拆分出的js命名为trends


// 配置管理系列
const ConfigIndex = () => import(/* webpackChunkName: "ConfigIndex" */ '../views/config/index.vue') // webpack的魔法注释，将拆分出的js命名为ConfigIndex

// 个人主页
const PersonCenter = () => import(/* webpackChunkName: "PersonCenter" */ '../views/personalCenter/index.vue') // webpack的魔法注释，将拆分出的js命名为PersonCenter


// 404及demo
const page_404 = () => import(/* webpackChunkName: "404" */ '../views/404.vue') // webpack的魔法注释，将拆分出的js命名为404


const routes = [

  {
    path: "/",
    redirect: '/home/index',
  },

  //地址为空时跳转home页面
  {
    path: "/",
    component: Layout,
    children: [

      // 首页系列
      {
          path: 'home',
          name: 'home',
          meta: {
            title: "首页",
          },
          component: EmptyLayout,
          children: [
            {
                path: 'index',
                name: 'homeIndex',
                component: Home,
                meta: {
                  title: "首页",
                  icon: "el-icon-s-home",
                  affix: true,
                }
            },
          ]
      },


      // 小组管理系列
      {
          path: '/group',
          name: 'group',
          meta: {
            title: "小组运营",
            icon: "el-icon-s-promotion",
          },
          component: EmptyLayout,
          children: [
            {
                path: 'index',
                name: 'groupIndex',
                component: GroupIndex,
                meta: {
                  title: "小组管理",
                  icon: "el-icon-s-promotion",
                  affix: true,
                }
            },

            {
                path: '/trends',
                name: 'trends',
                meta: {
                  title: "动态管理",
                  icon: "el-icon-s-promotion",
                },
                component: EmptyLayout,
                children: [
                  {
                      path: 'index',
                      name: 'trendsIndex',
                      component: groupTrends,
                      meta: {
                        title: "动态管理",
                        icon: "el-icon-s-claim",
                        affix: true,
                      }
                  },
      
                ]
                
            },


            // 不可见页面路由-创建/编辑小组
            {
              path: 'create',
              name: 'groupCreate',
              component: groupCreate,
              hidden: true,
              meta: {
                title: "创建小组",
              }
            },

            // 不可见页面路由-小组成员管理
            {
              path: 'member',
              name: 'groupMember',
              component: groupMember,
              hidden: true,
              meta: {
                title: "成员管理",
              }
            },

          ]
          
      },


      // 配置管理
      {
          path: '/config',
          name: 'config',
          meta: {
            title: "配置管理",
          },
          component: EmptyLayout,
          children: [
            {
                path: 'index',
                name: 'configIndex',
                component: ConfigIndex,
                meta: {
                  title: "配置管理",
                  icon: "el-icon-s-data",
                  affix: true,
                }
            },
          ]
          
      },

      // 个人主页
      {
          path: '/personCenter',
          name: 'personCenter',
          hidden: true,
          meta: {
            title: "个人中心",
          },
          component: EmptyLayout,
          children: [
            {
                path: 'index',
                name: 'personCenterIndex',
                component: PersonCenter,
                meta: {
                  title: "个人中心",
                }
            },
          ]
          
      },



      // 404及demo页面系列
      {
          path: '*',
          meta: { keepAlive: true },
          component: page_404, // 404页面
      },
      
    ],

  },

]

export default routes
