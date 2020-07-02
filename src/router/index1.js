import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
// 连续点击路由报错处理方法(vue-router3.1 以上版本會出現)
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/countcata"
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
        name: "Home"
      },
      children: [
        {
          path: "home",
          name: "Home",
          component: function(resolve) {
            require(["@/views/home/home.vue"], resolve);
          }
        },
        {
          path: "vform",
          name: "Vform",
          component: function(resolve) {
            require(["@/views/vform/vform.vue"], resolve);
          }
        }
      ]
    },
    {
      path: "/login",
      component: function(resolve) {
        require(["@/views/login.vue"], resolve);
      }
    }
  ]
});
