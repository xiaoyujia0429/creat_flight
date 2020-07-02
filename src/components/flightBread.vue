<template>
  <div id="bread">
    <div class="bread-title">
      <div
        v-for="(item, index) in breadlist"
        :key="index"
        class="bread-curry"
        @click="tab(index)"
        :class="[index == active ? 'active' : '']"
      >
        <span class="icon  bread-icon"></span>
        <span v-if="item.path" :to="{ path: '/' + item.path }">{{
          item.title
        }}</span>
        <span v-else>{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    breadlist: {
      type: Array
    },
    title: {
      type: String
    },
    icon: {
      type: String
    },
    path: {
      type: String
    },
    active: {
      type: Number
    }
  },
  data() {
    return {};
  },
  methods: {
    tab(index) {
      this.$emit("tab", index);
    }
  }
};
</script>
<style lang="less" scoped>
// .bread-title {
//   height: 42px;
//   line-height: 42px;
// }
.bread-curry {
  display: inline-block;
  line-height: 42px;
  cursor: pointer;
  padding: 0 20px;
  color: #666666;
  font-size: 16px;
  font-weight: bold;
  line-height: 40px;
  border-radius: 3px 3px 0 0;
}
.bread-icon {
  width: 21px;
  height: 23px;
  margin-right: 5px;
  vertical-align: middle;
}
.active {
  color: #1a68b5;
  cursor: default;
  background-color: #e3edf7;
  border-bottom-color: transparent;
}
</style>
