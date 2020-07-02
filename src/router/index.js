import Vue from "vue";
import Router from "vue-router";
import { getToken } from "@/utils/auth";

Vue.use(Router);
// 连续点击路由报错处理方法(vue-router3.1 以上版本會出現)
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};

const routes = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/countcata",
    name: "countcata",
    redirect: "/welcome",
    component: function(resolve) {
      require(["@/views/countcata/countcata.vue"], resolve);
    },
    children: [
      {
        //首页
        path: "/welcome",
        meta: {
          title: "首页"
        },
        component: function(resolve) {
          require(["@/views/welcome/welcome.vue"], resolve);
        }
      },
      {
        //导航设置
        path: "/nav",
        meta: {
          title: "设置导航"
        },
        component: function(resolve) {
          require(["@/views/nav/nav.vue"], resolve);
        }
      },
      {
        //留言管理
        path: "/mail",
        meta: {
          title: "留言管理"
        },
        component: function(resolve) {
          require(["@/views/main/main.vue"], resolve);
        }
      },

      {
        //基础演示
        path: "/uploadFile",
        meta: {
          title: "文件上传"
        },
        component: function(resolve) {
          require(["@/views/uploadFile/uploadFile.vue"], resolve);
        }
      },
      {
        //基础演示
        path: "/slider",
        meta: {
          title: "滑块"
        },
        component: function(resolve) {
          require(["@/views/slider/slider.vue"], resolve);
        }
      },
      {
        //基础演示
        path: "/cardList",
        meta: {
          title: "卡片列表"
        },
        component: function(resolve) {
          require(["@/views/cardlist/cardlist.vue"], resolve);
        }
      },
      {
        //基础演示
        path: "/waterfall",
        meta: {
          title: "图片瀑布屏"
        },
        component: function(resolve) {
          require(["@/views/waterfall/waterfall.vue"], resolve);
        }
      },
      {
        //基础演示
        path: "/steps",
        meta: {
          title: "步骤条（流程条）"
        },
        component: function(resolve) {
          require(["@/views/steps/steps.vue"], resolve);
        }
      },
      {
        //设置个人信息
        path: "/mineInfo",
        meta: {
          title: "设置个人信息"
        },
        component: function(resolve) {
          require(["@/views/mineInfo/mineInfo.vue"], resolve);
        }
      },
      {
        //quillEditor
        path: "/quillEditor",
        meta: {
          title: "编辑文章（富文本）"
        },
        component: function(resolve) {
          require(["@/views/quillEditor/quillEditor.vue"], resolve);
        }
      }
    ]
  },
  {
    path: "/index",
    component: function(resolve) {
      require(["@/views/index/index.vue"], resolve);
    },
    redirect: {
      name: "home"
    },
    children: [
      {
        path: "home",
        name: "home",
        meta: {
          title: "付款代理公司管理"
        },
        component: function(resolve) {
          require(["@/views/home/home.vue"], resolve);
        }
      },
      {
        path: "vform",
        name: "Vform",
        meta: {
          title: "费用类型设置"
        },
        component: function(resolve) {
          require(["@/views/vform/vform.vue"], resolve);
        }
      }
    ]
  },
  {
    path: "/login",
    meta: {
      title: "登录页"
    },
    component: function(resolve) {
      require(["@/views/login.vue"], resolve);
    }
  },
  {
    path: "/404",
    meta: {
      title: "错误页面-404"
    },
    component: function(resolve) {
      require(["@/views/error/NotPath_404.vue"], resolve);
    }
  }
];
const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
/*
 * 全局前置路由
 * */
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  console.log(to);
  if (to.matched.length === 0) {
    console.log(111);
    next("/404");
  }
  //校验是否登录，防止不登录，直接进入其他页面
  if (
    (to.path == "/login" && from.path === "/") ||
    (to.path == "/countcata" && from.path === "/login")
  ) {
    console.log(222);

    next();
  } else {
    if (getToken() === null || getToken() === undefined) {
      console.log(getToken());
      next("/login");
    } else {
      console.log(getToken(), "---------");
      next();
    }
  }
});
export default router;
