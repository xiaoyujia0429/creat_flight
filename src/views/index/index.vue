<template>
  <div class="index" style="height:100%">
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
            class="el-menu-vertical-demo"
            :class="`aside${value.id}`"
            @open="handleOpen"
            @close="handleClose"
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
                @click="openTab(item)"
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
                    @click="openTab(subItem)"
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
                      @click="openTab(subItem)"
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
          <div class="icon navtab" @click="navtab">
            <span class="el-icon-caret-right"></span>
          </div>
        </el-aside>
        <el-main class="elmain">
          <transition name="compAnimate" appear>
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import $ from "jquery";
export default {
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
              title1: "付款代理公司管理",
              menuId: "home",
              icon: "el-icon-s-platform",
              sub: []
            },
            {
              id: 2,
              title1: "费用费率设置",
              icon: "el-icon-setting",
              menuId: "1-2",
              sub: [
                { id: 124, title2: "费用类型设置", menuId: "vform", sub: [] },
                { id: 125, title2: "费用费率设置", menuId: "2-2", sub: [] },
                {
                  id: 126,
                  title2: "节假日管理",
                  menuId: "1-3",
                  sub: [
                    { id: 131, title3: "春节", menuId: "3-1" },
                    { id: 132, title3: "元宵节", menuId: "3-2" }
                  ]
                }
              ]
            },
            {
              id: 3,
              title1: "出港运单费用管理",
              menuId: "3-3",
              icon: "el-icon-chat-line-square",
              sub: []
            },
            {
              id: 4,
              title1: "出港运单费用管理仓租",
              menuId: "4-4",
              icon: "el-icon-chat-line-square",
              sub: []
            },
            {
              id: 5,
              title1: "进港运单费用管理",
              menuId: "5-5",
              icon: "el-icon-chat-line-square",
              sub: []
            },
            {
              id: 6,
              title1: "历史记录",
              menuId: "6-6",
              icon: "el-icon-chat-line-square",
              sub: [
                { id: 161, title2: "费用类型设置", menuId: "1-161", sub: [] },
                { id: 162, title2: "费用费率设置", menuId: "1-162", sub: [] },
                { id: 163, title2: "节假日管理", menuId: "1-163", sub: [] }
              ]
            }
          ]
        }
      ]
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("app/toggleloading", false);
  },
  methods: {
    // ...mapActions(["toggleloading"]),

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    exit() {
      console.log(this.toggleloading);
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
    navtab() {
      var asidewidth = $(".el-aside").width();
      if (asidewidth === 0) {
        $(".el-aside").animate(
          {
            width: "220px"
          },
          500
        );
        $(".navtab").animate(
          {
            left: "220px"
          },
          500
        );
        $(".el-header").animate(
          {
            height: "120px"
          },
          500
        );
        $(".logo").css("display", "block");
      } else {
        // $(".el-aside").width(0);
        // $(".navtab").css("left", "0");
        $(".el-aside").animate(
          {
            width: "0px"
          },
          500
        );
        $(".navtab").animate(
          {
            left: "0px"
          },
          500
        );
        $(".el-header").animate(
          {
            height: "0px"
          },
          500
        );
        $(".logo").css("display", "none");
      }
    },
    openTab() {}
  },
  computed: {
    activeNav() {
      //当前激活的导航
      return this.$route.path;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "assets/css/index.less";
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
