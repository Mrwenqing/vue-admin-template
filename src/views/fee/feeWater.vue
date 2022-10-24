<template>
  <div class="fee">
    <div class="top">
      <isForm v-model.sync="page" :formList="topFormList">
        <template v-slot:btn="scope">
          <el-button icon="el-icon-search" size="mini" @click="quer"
            >查询</el-button
          >
          <el-button
            style="color: #ff7670"
            icon="el-icon-close"
            size="mini"
            @click="reset"
            >重置</el-button
          >
          <el-button
            icon="el-icon-close"
            size="mini"
            type="primary"
            @click="addNew"
            >新增</el-button
          >
        </template>
      </isForm>
    </div>
    <isTable :list="feeList" :listInfo="listInfo" :height="height">
      <template v-slot:btn="scope">
        <el-button
          icon="el-icon-edit"
          type="primary"
          size="mini"
          @click="edit(scope.row)"
          >编辑</el-button
        >
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          @click="delte(scope.row)"
          >删除</el-button
        >
        <el-button
          type="warning"
          icon="el-icon-delete"
          size="mini"
          v-show="scope.row.payWaterStatus == 0"
          @click="pay(scope.row)"
          >缴费</el-button
        >
      </template>
    </isTable>
    <isPagination
      :currentPage="page.currentPage"
      :pageSizes="pageSizes"
      :pageSize="page.pageSize"
      :total="page.total"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    ></isPagination>
    <isDialog :title="title" :dialogVisible.sync="dialogVisible" :width="width">
      <template v-slot:form="scope">
        <isForm
          ref="form"
          v-model.sync="forms"
          :formList="dialogTopFormList"
          :labelWidth="labelWidth"
          :labelPosition="labelPosition"
          @Buildid="Buildid"
          :rules="rules"
          @formScree="formScree"
        >
        </isForm>
      </template>
      <template v-slot:btn="scope">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addOk">确 定</el-button>
      </template>
    </isDialog>
  </div>
</template>

<script>
import {
  getList,
  getFormList,
  getFormBuildId,
  getFormUnitId,
  getNewAdd,
  getEdit,
  getDelte,
  getPay,
} from "@/api/fee/feewater";
import isForm from "@/components/view/isForm.vue";
import isTable from "@/components/view/isTable.vue";
import isPagination from "@/components/view/isPagination.vue";
import isDialog from "@/components/view/isDialog.vue";
export default {
  components: {
    isForm,
    isTable,
    isPagination,
    isDialog,
  },
  data() {
    return {
      title: "",
      dialogVisible: false,
      width: "650px",
      labelWidth: "80px",
      labelPosition: "right",
      page: {
        loginName: "",
        houseNum: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      pageSizes: [5, 10, 15, 20],
      topFormList: [
        {
          type: "input",
          prop: "loginName",
          label: "姓名",
          size: "mini",
          width: "width:184px",
        },
        {
          type: "input",
          prop: "houseNum",
          label: "房屋编号",
          size: "mini",
          width: "width:184px",
        },
      ],
      feeList: [],
      listInfo: [
        {
          type: "",
          prop: "loginName",
          label: "姓名",
        },
        {
          type: "",
          prop: "phone",
          label: "电话",
        },
        {
          type: "",
          prop: "name",
          label: "栋数",
        },
        {
          type: "",
          prop: "unitName",
          label: "单元",
        },
        {
          type: "",
          prop: "houseNum",
          label: "房屋编号",
        },
        {
          type: "",
          prop: "payWaterMoney",
          label: "缴费金额",
        },
        {
          type: "",
          prop: "payWaterMonth",
          label: "所属月份",
        },
        {
          type: "",
          prop: "waterrNum",
          label: "表显",
        },
        {
          type: "status",
          prop: "payWaterStatus",
          label: "缴费状态",
          callBack: (options) => {
            console.log(options);
            return (options = options == 0 ? "未交费" : "已缴费");
          },
        },
        {
          type: "btn",
          label: "操作",
          width: 270,
          align: "center",
        },
      ],
      height: 670,
      formList: [],
      forms: {
        buildId: null,
        editType: "0",
        houseId: null,
        //缴费金额
        payWaterMoney: "",
        //时间
        payWaterMonth: "",
        //缴费状态
        payWaterStatus: "",
        powerId: "",
        //表显
        waterrNum: "",
        unitId: "",
      },
      dialogTopFormList: [
        {
          type: "select",
          prop: "name",
          label: "栋数",
          children: [],
        },
        {
          type: "select",
          prop: "unitName",
          label: "单元",
          children: [],
        },
        {
          type: "select",
          prop: "houseNum",
          label: "房屋编号",
          children: [],
        },
        {
          type: "Date",
          prop: "payWaterMonth",
          label: "所属月份",
        },
        {
          type: "input",
          prop: "payWaterMoney",
          label: "缴费金额",
        },
        {
          type: "input",
          prop: "waterrNum",
          label: "表显",
          size: "small ",
        },
        {
          type: "radio",
          prop: "payWaterStatus",
          label: "缴费状态",
          children: [
            {
              label: "0",
              name: "未交费",
            },
            {
              label: "1",
              name: "已缴费",
            },
          ],
        },
      ],
      rules: {
        name: [{ required: true, message: "请选中栋数", trigger: "blur" }],
        unitName: [{ required: true, message: "请选择单元", trigger: "blur" }],
        houseNum: [
          { required: true, message: "请选中房屋编号", trigger: "blur" },
        ],
        payWaterMonth: [
          { required: true, message: "请选择月份", trigger: "blur" },
        ],
        payWaterMoney: [
          { required: true, message: "请填写缴费金额", trigger: "blur" },
        ],
        waterrNum: [{ required: true, message: "请填写表显", trigger: "blur" }],
        payWaterStatus: [
          { required: true, message: "请选择缴费状态", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //获取全部
    async handelList() {
      try {
        const { data } = await getList(this.page);
        this.feeList = data.records;
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
      this.page.loginName = "";
      this.page.houseNum = "";
      this.handelList();
    },
    //每页数量
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.handelList();
    },
    //当前数量
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.handelList();
    },
    //获取栋数
    async handelFormList() {
      try {
        const res = await getFormList();
        this.dialogTopFormList[0].children = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    //新增
    addNew() {
      this.forms.editType = "0";
      this.dialogVisible = true;
      this.title = "新增水费";
      for (let i in (this, this.forms)) {
        this.forms[i] = "";
      }
    },
    //获取单元
    async handelBuildid(id) {
      try {
        const res = await getFormBuildId({ buildId: id });
        this.dialogTopFormList[1].children = res.data;
      } catch (error) {}
    },
    //获取编号
    async handelUnitid(id) {
      try {
        const res = await getFormUnitId({ unitId: id });
        this.dialogTopFormList[2].children = res.data;
      } catch (error) {}
    },
    //input选中
    Buildid(val) {
      if (val.name == "栋数") {
        this.handelBuildid(val.val);
      } else if (val.name == "单元") {
        this.handelUnitid(val.val);
      }
    },
    //新增接口
    async handelAdd() {
      try {
        const res = await getNewAdd(this.forms);
        this.dialogVisible = false;
        if (res.code == 200) {
          this.$message.success(res.msg);
          this.handelList();
        }
      } catch (error) {}
    },
    //校验
    formScree(val) {
      console.log(val);
      this.formFlag = val;
    },
    //确定
    addOk() {
      console.log(this.forms.editType);
      this.$refs["form"].formScree();
      if (this.formFlag) {
        if (this.forms.editType == "1") {
          this.handelEdit();
          
        } else {
          this.handelAdd();
        }
      }
    },
    //取消
    cancel() {
      this.$refs["form"].cancel();
    },
    //编辑
    edit(row) {
      console.log(row);
      this.forms = JSON.parse(JSON.stringify(row));
      this.forms.editType = "1";
      this.title = "编辑水费";
      this.dialogVisible = true;
    },
    //编辑接口
    async handelEdit() {
      try {
        const res = await getEdit(this.forms);
        this.dialogVisible = false;
        console.log(res);
        if (res.code == 200) {
          this.$message.success(res.msg);
          this.handelList();
        }
      } catch (error) {}
    },
    //删除接口
    async handelDel(id) {
      try {
        const res = await getDelte(id);
        if (res.code == 200) {
          this.$message.success(res.msg);
          this.handelList();
        }
      } catch (error) {}
    },
    //删除
    async delte(row) {
      console.log(row);
      const res = await this.$util.config("此操作将永久删除文件");
      if (res) {
        this.handelDel(row.waterId);
      }
    },
    //缴费接口
    async handelPay(obj) {
      try {
        const res = await getPay(obj);
        if (res.code == 200) {
          this.$message.success(res.msg);
          this.handelList();
        }
        console.log(res);
      } catch (error) {}
    },
    //缴费
    async pay(row) {
      console.log(row);
      let obj = {
        waterId:row.waterId
      };
      const res = await this.$util.config("是否进行操作");
      if (res) {
        this.handelPay(obj);
      }
    },
  },
  created() {
    this.handelList();
    this.handelFormList();
  },
};
</script>

<style lang="scss" scoped>
.fee {
  padding: 20px;
}
</style>
