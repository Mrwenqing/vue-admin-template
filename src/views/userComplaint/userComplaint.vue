<template>
  <div class="complaint">
    <div class="top">
      <isForm v-model.sync="page" :formList="topFormList">
        <template v-slot:btn="scope">
          <el-button icon="el-icon-search" size="mini" @click="quer">查询</el-button>
          <el-button style="color:#ff7670" icon="el-icon-close" size="mini" @click="reset">重置</el-button>
        </template>
      </isForm>
    </div>
    <isTable :list="complaintList" :listInfo="listInfo" :height="height">
      <template v-slot:btn="scope">
        <el-button icon="el-icon-edit" type="success" size="mini">处理</el-button>
      </template>
    </isTable>
    <isPagination :currentPage="page.currentPage" :pageSizes="pageSizes" :pageSize="page.pageSize" :total="page.total" 
    @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></isPagination>
  </div>
</template>

<script>
import { getList } from "@/api/userComplaint/userComplaint";
import isForm from "@/components/view/isForm.vue";
import isTable from "@/components/view/isTable.vue";
import isPagination from "@/components/view/isPagination.vue";
export default {
  components: {
    isForm,
    isTable,
    isPagination,
  },
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 10,
        title: "",
        complaintContent: "",
        total: 0,
      },
      topFormList: [
        {
          type: "input",
          label: "标题",
          prop: "title",
          size: "mini",
          width: "width:184px;margin-right: 30px;",
        },
        {
          type: "input",
          label: "内容",
          prop: "complaintContent",
          size: "mini",
          width: "width:184px",
        },
      ],
      pageSizes:[5,10,15,20],
      complaintList: [],
      height: 670,
      listInfo: [
        {
          type: "",
          label: "标题",
          prop: "title",
        },
        {
          type: "",
          label: "内容",
          prop: "complaintContent",
        },
        {
          type: "status",
          label: "处理状态",
          prop: "status",
          callBack: (options) => {
            return (options = options == "1" ? "已处理" : "未处理");
          },
        },
        {
          type: "btn",
          label: "操作",
          width: 119,
        },
      ],
    };
  },
  methods: {
    //获取全部数据
    async handelList() {
      try {
        const { data } = await getList(this.page);
        console.log(data);
        this.complaintList = data.records;
        this.page.total = data.total;
      } catch (error) {
        console.log(error);
      }
    },
    //查询
    quer() {
      this.handelList();
    },
    //重置
    reset() {
      this.page.title = "";
      this.page.complaintContent = "";
      this.handelList();
    },
    //每页数量
    handleCurrentChange(val){
      this.page.currentPage = val
       this.handelList();
    },
    //当前页数
    handleSizeChange(val){
      this.page.pageSize = val
       this.handelList();
    },
  },
  created() {
    this.handelList();
  },
};
</script>

<style lang="scss" scoped>
.complaint {
  padding: 20px;
  .top {
    margin-left: 20px;
  }
}
</style>