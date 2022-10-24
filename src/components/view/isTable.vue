<template>
  <div>
    <el-table :data="list" stripe border style="width: 100%" :height="height">
      <template v-for="item in listInfo">
        <el-table-column v-if="item.type===''" :prop="item.prop" :label="item.label" v-bind="item">
        </el-table-column>


         <el-table-column v-if="item.type==='status'" :prop="item.prop" :label="item.label" v-bind="item">
          <template slot-scope="scope" v-if="item.prop ==='status'">
            <el-tag :type="scope.row.status==0?'danger':'success'">{{item.callBack(scope.row.status)}}</el-tag>
          </template>
          <template slot-scope="scope" v-if="item.prop ==='payPowerStatus' ">
            <el-tag :type="scope.row.payPowerStatus==0?'danger':'success'">{{item.callBack(scope.row.payPowerStatus)}}</el-tag>
          </template>
          <template slot-scope="scope" v-if="item.prop ==='payWaterStatus'">
            <el-tag :type="scope.row.payWaterStatus==0?'danger':'success'">{{item.callBack(scope.row.payWaterStatus)}}</el-tag>
          </template>
        </el-table-column>


        
        <el-table-column v-if="item.type==='btn'" :prop="item.prop" :label="item.label" v-bind="item" :width="item.width" >
          <template slot-scope="scope">
            <slot name="btn" :row="scope.row"></slot>
          </template>
        </el-table-column>
      </template>

    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    listInfo: {
      type: Array,
      default: () => [],
    },
    height: {
      type: Number,
    },
  },
  created() {},
};
</script>

<style>
</style>