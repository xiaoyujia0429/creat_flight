<template>
  <div class="countcata" style="height:100%">
    <el-container>
      <el-header :height="height" class="elheader">
        <div class="logo">
          <div class="user">
            <div class="userBox">
              <div class="user-icon"></div>
              <div class="user-name">
                <span>{{ userName }} </span>
                <span
                  class="icon setting "
                  id="setting"
                  @click="issure = !issure"
                >
                  设置
                </span>
                <span v-show="issure" class="userinfo">用户资料</span>
                <span class="icon exit" @click="exit()">退出</span>
              </div>
            </div>
          </div>
          <div class="logofig"></div>
          <div class="flight_right"></div>
        </div>
      </el-header>
      <el-container>
        <el-aside
          class="elaside"
          width="220px"
          min-width="15px;"
          v-for="value in menuList"
          :key="value.id"
        >
          <div class="aisde-title" @click="isshow(value.id)">
            <span class="icon nav-icon-coccweb"></span>
            <span>{{ value.title }}</span>
          </div>
          <el-menu
            :default-active="String(activeNav)"
            class="el-menu-vertical"
            :class="`aside${value.id}`"
            @cliak="handleOpen"
            background-color="#1b68b6"
            text-color="#fff"
            active-text-color="#fff"
            :unique-opened="true"
            ref="menu"
            :router="true"
          >
            <template v-for="item in value.sub">
              <!-- 一级菜单 -->
              <el-menu-item
                class="first_layer_menu_item"
                v-if="item.sub.length === 0"
                :key="item.id"
                :index="item.menuId"
              >
                <i
                  v-if="item.icon"
                  :class="item.icon"
                  :style="{ color: ' #fff' }"
                ></i>
                <span class="menu_item_txt">{{ item.title1 }}</span>
              </el-menu-item>
              <!-- 多级菜单 -->
              <el-submenu
                class="first_layer_menu_item"
                v-else
                :key="item.id"
                :index="item.menuId"
              >
                <template slot="title">
                  <i
                    v-if="item.icon"
                    :class="item.icon"
                    :style="{ color: ' #fff' }"
                  ></i>
                  <span class="menu_item_txt">{{ item.title1 }}</span>
                </template>
                <template v-for="subItem in item.sub">
                  <el-menu-item
                    class="second_layer_menu_item"
                    v-if="subItem.sub.length == 0"
                    :key="subItem.id"
                    :index="subItem.menuId"
                  >
                    <i
                      v-if="item.icon"
                      :class="item.icon"
                      :style="{ color: ' #fff' }"
                    ></i>
                    <span class="menu_item_txt">{{ subItem.title2 }}</span>
                  </el-menu-item>
                  <el-submenu
                    class="second_layer_menu_item"
                    v-else
                    :key="subItem.id"
                    :index="subItem.menuId"
                  >
                    <template slot="title">
                      <i
                        v-if="item.icon"
                        :class="item.icon"
                        :style="{ color: ' #fff' }"
                      ></i>
                      <span class="menu_item_txt">{{ subItem.title2 }}</span>
                    </template>
                    <el-menu-item
                      class="third_layer_menu_item"
                      v-for="subItem in subItem.sub"
                      :key="subItem.id"
                      :index="subItem.menuId"
                    >
                      <i
                        v-if="item.icon"
                        :class="item.icon"
                        :style="{ color: ' #fff' }"
                      ></i>
                      <span class="menu_item_txt">{{ subItem.title3 }}</span>
                    </el-menu-item>
                  </el-submenu>
                </template>
              </el-submenu>
            </template>
          </el-menu>
        </el-aside>
        <el-main class="elmain">
          <AsideTitle></AsideTitle>
          <div class="content">
            <transition name="compAnimate" appear>
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
            </transition>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AsideTitle from "@/views/layout/rightMain/AsideTitle";
import { mapActions, mapGetters } from "vuex";
import $ from "jquery";
export default {
  components: {
    AsideTitle
  },
  name: "index",
  data() {
    return {
      userName: "梁一鸣",
      height: "120",
      issure: false,
      asidewidth: true,
      menuList: [
        {
          id: 111,
          active: "../../assets/image/icon.png",
          title: "货站计费管理",
          menuId: "1",
          sub: [
            {
              id: 123,
              title1: "首页",
              menuId: "welcome",
              icon: "el-icon-s-platform",
              sub: []
            },
            {
              id: 2,
              title1: "费用费率设置",
              icon: "el-icon-setting",
              menuId: "1-2",
              sub: [
                { id: 124, title2: "设置导航", menuId: "nav", sub: [] },
                {
                  id: 125,
                  title2: "设置个人信息",
                  menuId: "mineInfo",
                  sub: []
                }
              ]
            },
            {
              id: 3,
              title1: "编辑文章（富文本）",
              menuId: "quillEditor",
              icon: "el-icon-chat-line-square",
              sub: []
            },
            {
              id: 4,
              title1: "留言管理",
              menuId: "mail",
              icon: "el-icon-chat-line-square",
              sub: []
            },
            {
              id: 5,
              icon: "el-icon-coin",
              title1: "基础演示",
              menuId: "1-3",
              sub: [
                { id: 131, menuId: "slider", title2: "滑块", sub: [] },
                { id: 132, menuId: "uploadFile", title2: "文件上传", sub: [] },
                { id: 133, menuId: "cardList", title2: "卡片列表", sub: [] },
                { id: 134, menuId: "waterfall", title2: "图片瀑布屏", sub: [] },
                {
                  id: 135,
                  menuId: "steps",
                  title2: "步骤条（流程条）",
                  sub: []
                }
              ]
            }
          ]
        }
      ],
      getNavs: "",
      getAsideTitle: this.$store.getters.AsideTitle,
      getCount: ""
    };
  },
  created() {
    this.$store.dispatch("header/setNavs", {
      nav: [
        { icon: "el-icon-s-platform", path: "/welcome", title: "首页" },
        {
          icon: "el-icon-setting",
          title: "费用费率设置",
          child: [
            { path: "/nav", title: "设置导航" },
            { path: "/mineInfo", title: "设置个人信息" }
          ]
        },
        {
          icon: "el-icon-chat-line-square",
          path: "/quillEditor",
          title: "编辑文章（富文本）"
        },
        {
          icon: "el-icon-chat-line-square",
          path: "/mail",
          title: "留言管理"
        },
        {
          icon: "el-icon-coin",
          title: "基础演示",
          child: [
            { path: "/slider", title: "滑块" },
            { path: "/uploadFile", title: "文件上传" },
            {
              path: "/cardList",
              title: "卡片列表"
            },
            {
              path: "/waterfall",
              title: "图片瀑布屏"
            },
            {
              path: "/steps",
              title: "步骤条（流程条）"
            }
          ]
        }
      ]
    });
  },
  mounted() {
    this.$store.dispatch("app/toggleloading", false);
  },
  methods: {
    // ...mapActions(["toggleloading"]),
    handleOpen() {},
    async exit() {
      // console.log(this.toggleloading);
      var vm = this;
      vm.$confirm("你确定要退出吗？", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        customClass: "el-title-index",
        showClose: false,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        type: "warning"
      })
        .then(() => {
          vm.$store.dispatch("LogOut").then(() => {
            this.$message({
              type: "success",
              message: "退出成功!"
            });
            setTimeout(() => {
              this.$router.push({ path: "/login" });
              // 退出的时候把vuex的管理数据复原
              // this.$store.commit("header/setCrumbs", ["首页", "首页"]);
              // this.$store.dispatch("header/setNavs", []);
              // this.$store.commit("header/setActiveIndex", 0);
              // this.$store.commit("header/setCount", 0);
              // this.$store.commit("header/delOrAddAside", [
              //   {
              //     title: "首页",
              //     path: "/welcome",
              //     activeIndex: 0
              //   }
              // ]);
            }, 2000);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    },
    isshow(id) {
      var classid = `.aside${id}`;
      $(classid).toggle();
    },

    createTabs(path) {
      // console.log(this.getNavs);
      if (path !== "/welcome") {
        let asideItem = new Object();
        // 得到当前点击的左侧导航的名字，存入vuex的header/asideTitle中
        let nav = this.getNavs.nav;
        // console.log(nav, "=========");
        for (let i = 0; i < nav.length; i++) {
          const parentTitle = nav[i].title;
          // console.log(parentTitle, "parentTitle");
          //判断是否存在子导航，如果存在则取子导航的名字，如果没有，则取当前的导航名字
          if (nav[i].child) {
            // console.log(nav[i].child);
            for (let j = 0; j < nav[i].child.length; j++) {
              if (nav[i].child[j].path === path) {
                const childTitle = nav[i].child[j].title;
                // console.log(this.getAsideTitle);
                //判断vuex中是否已经存在当前标题，如果存在则不处理，否则添加入vuex中
                let result = this.getAsideTitle.filter(item => {
                  return item.title === nav[i].child[j].title;
                });
                if (result.length == 0) {
                  //添加标题标签
                  let count = this.getCount;
                  count++;
                  this.$store.commit("header/setCount", count);
                  asideItem.title = nav[i].child[j].title;
                  asideItem.path = nav[i].child[j].path;
                  asideItem.activeIndex = count;
                  this.$store.commit("header/setAside", asideItem);
                  this.$store.commit("header/setActiveIndex", count);
                  this.setCrumbs(parentTitle, childTitle);
                  return;
                } else {
                  //定位到当前标题标签
                  if (nav[i].child[j].path === path) {
                    let result = this.getAsideTitle.filter(item => {
                      return item.title === nav[i].child[j].title;
                    });
                    this.$store.commit(
                      "header/setActiveIndex",
                      result[0].activeIndex
                    );
                    this.setCrumbs(parentTitle, childTitle);
                  }
                }
              }
            }
          } else {
            // console.log("没有子导航");
            if (nav[i].path === path) {
              // console.log(nav[i].path, path, "===");
              //判断vuex中是否已经存在当前标题，如果存在则不处理，否则添加入vuex中
              let result = this.getAsideTitle.filter(item => {
                return item.title === nav[i].title;
              });
              const childTitle = nav[i].title;
              //添加标题标签
              if (result.length == 0) {
                let count = this.getCount;
                count++;
                this.$store.commit("header/setCount", count);
                asideItem.title = nav[i].title;
                asideItem.path = nav[i].path;
                asideItem.activeIndex = count;
                this.$store.commit("header/setAside", asideItem);
                this.$store.commit("header/setActiveIndex", count);
                this.setCrumbs(childTitle, "");
                return;
              } else {
                //定位到当前标题标签
                if (nav[i].path === path) {
                  let result = this.getAsideTitle.filter(item => {
                    return item.title === nav[i].title;
                  });
                  this.$store.commit(
                    "header/setActiveIndex",
                    result[0].activeIndex
                  );
                  this.setCrumbs(childTitle, "");
                }
              }
            }
          }
        }
      } else {
        this.$store.commit("header/setActiveIndex", 0);
        this.setCrumbs("首页", "首页");
      }
    },
    setCrumbs(pt, ct) {
      let crumbs = new Array();
      crumbs.push(pt, ct);
      this.$store.commit("header/setCrumbs", crumbs);
    }
  },
  computed: {
    activeNav() {
      //当前激活的导航
      return this.$route.path;
    },
    /*
     * 在VUEX中获得asideColor颜色值
     * */
    ...mapGetters(["Navs", "AsideTitle", "Count"])
  },
  watch: {
    $route: function(to) {
      // console.log(to);
      this.createTabs(to.path);
    },
    Navs(val) {
      this.getNavs = val;
    },
    AsideTitle(val) {
      // console.log("AsideTitle", val);
      this.getAsideTitle = val;
    },
    Count(val) {
      // console.log("Count", val);
      this.getCount = val;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "assets/css/countcata.less";
</style>
<style lang="less">
.elheader {
  background: #a5cde1;
  height: 120px;
}
.elaside {
  display: inline-block;
}
.elmain {
  display: inline-block;
  flex: 1;
  flex-basis: initial !important;
  overflow: auto;
  box-sizing: border-box;
  padding: 20px;
}
.el-title-index {
}

.el-message-box {
  border: none !important;
  height: 170;
  width: 300px;
}
.el-message-box__header {
  background: #337ab7;
}
.el-message-box__title span {
  color: #fff;
  font-size: 16px;
}
.el-icon-warning:before {
  content: "" !important;
}
.el-message-box__content {
  border-bottom: 1px solid #999;
}
.el-message-box__status + .el-message-box__message {
  padding-left: 0px;
}
.first_layer_menu_item {
  margin: -1px;
}
.el-menu-item.is-active {
  background: #0e4480 !important;
}
.el-menu-item {
  height: 35px;
  line-height: 35px;
}
.el-submenu .el-menu-item {
  height: 35px;
  line-height: 35px;
}
.el-submenu__title {
  height: 35px;
  line-height: 35px;
}
</style>
