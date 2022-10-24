<template>
  <div>
    <el-form ref="form" size="small" :inline="true" :label-position="labelPosition" :model="value" class="demo-form-inline" :rules="rules" :label-width="labelWidth">
      <template v-for="item in formList">
        <el-form-item v-if="item.type=='input'" :label="item.label" :prop="item.prop" :class="item.label=='表显'?'ml':''">
          <el-input v-model="value[item.prop]" v-bind="item" :style="item.width"></el-input>
        </el-form-item>
        <el-form-item v-if="item.type=='select'" :label="item.label" :prop="item.prop">
          <el-select v-model="value[item.prop]" v-bind="item" @change="Buildid" @input="selectName(item.label)">
            <el-option :label="item.label=='栋数'?ele.name:item.label=='单元'?ele.unitName:ele.houseNum" :value="item.label=='栋数'?ele.buildId:item.label=='单元'?ele.unitId:ele.houseId" v-for="(ele,i) in item.children" :key="i"></el-option>
            <!-- <el-option :label="ele.unitName" :value="ele.unitId" v-for="(ele,i) in item.children" :key="i"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item v-if="item.type=='Date'" :label="item.label" :prop="item.prop">
          <el-date-picker v-model="value[item.prop]" type="month" placeholder="选择月份">
          </el-date-picker>
        </el-form-item>
        <el-form-item v-if="item.type=='radio'" :label="item.label" :prop="item.prop">
           <el-radio v-model="value[item.prop]" :label="ele.label" v-for="(ele,i) in item.children">{{ele.name}}</el-radio>
        </el-form-item>
      </template>
      <slot name="btn"></slot>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    formList: {
      type: Array,
      default: () => [],
    },
    rules: {
      type: Object,
      default: () => {},
    },
    labelWidth: {
      type: String,
    },
    labelPosition: {
      type: String,
    },
  },
  methods: {
    formScree() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          console.log(valid);
          this.$emit("formScree", valid);
        } else {
          this.$emit("formScree", valid);
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel() {
      this.$refs["form"].resetFields();
    },
    Buildid(val) {
      this.$emit("Buildid", { val: val, name: this.ctName });
    },
    selectName(val) {
      this.ctName = val;
      console.log(this.ctName);
    },
  },
  created() {
    console.log(this.formList[0]);
  },
};
</script>

<style>
.ml{
  margin-left: 15px;
}
</style>
