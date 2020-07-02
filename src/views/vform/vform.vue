<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-06-10 18:55:00
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-06-22 18:02:19
-->
<template>
  <div id="home">
    <flight-bread
      :breadlist="breadlist"
      :active="active"
      @tab="tab"
    ></flight-bread>
    <div class="tab-content-heading"></div>
    <div class="content">
      <div v-show="active === 0">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="活动名称" prop="name">
            <el-input class="prefix" v-model="ruleForm.prefix"></el-input>
            <el-input class="suffix" v-model="ruleForm.suffix"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间" required>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleForm.date1"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker
                  placeholder="选择时间"
                  v-model="ruleForm.date2"
                  style="width: 100%;"
                ></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="即时配送" prop="delivery">
            <el-switch v-model="ruleForm.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="活动性质" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="特殊资源" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >立即创建</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="active === 1">1111111111</div>
      <div v-show="active === 2">2222222222</div>
    </div>
  </div>
</template>
<script>
import flightBread from "@/components/flightBread.vue";
export default {
  components: {
    flightBread
  },
  data() {
    return {
      breadlist: [
        { title: "查询费率", path: "", id: 1 },
        { title: "费率设置", path: "", id: 2 },
        { title: "铺货特货码设置", path: "", id: 3 }
      ],
      active: 0,
      ruleForm: {
        prefix: "",
        suffix: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  created() {
    
  },
  methods: {
    tab(childData) {
      this.active = childData;
    },
    examine() {},
    compile() {},
    jump() {},
    //text的跳转触发
    handleDelete(val) {
      console.log(val);
      this.StringUtil.getDecorator();
    },
    // checkbox的触发接收
    handleSelectionChange(val) {
      console.log(val);
      this.StringUtil.getDecorator();
    },
    // 点击tbody的行触发
    clickTable(val) {
      console.log(val);
      this.StringUtil.getDecorator();
    },
    //button的触发
    handleEdit(val) {
      console.log(val);
      this.StringUtil.getDecorator();
    }
  }
};
</script>
<style lang="less" scoped>
@import "assets/css/home.less";
</style>
<style lang="less">
#home {
  .bread-icon {
    background-position: -125px -5px;
  }
}
.active .bread-icon {
  background-position: -105px -5px !important;
}
.el-select.el-select--small {
  width: 100%;
}
</style>
