<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table :data="taskData" :row-key="row => row.index" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props"></template>
        </el-table-column>
        <el-table-column label="标题" prop="TITLE"></el-table-column>
        <el-table-column label="下发地市" prop="SENDDEPARTMENT"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-tag type="primary">{{getStatusCn(scope.row.TASKSTATUS)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="small" @click="checkTaskDetail(scope.row)">详情</el-button>
            <!-- <el-button
                      size="small"
                      type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <div class="Pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          layout="total, prev, pager, next"
          :total="page.totalPage"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "@/mixin/mixin";
import { getTaskList } from "@/api/getDataByAxios";
import { mapMutations } from "vuex";
export default {
  mixins: [mixin],
  data() {
    return {
      count: 0,
      taskData: [],
      currentPage: 1,
      selectTable: {},
      dialogFormVisible: false,
      menuOptions: [],
      selectMenu: {},
      expendRow: []
    };
  },
  created() {
    // this.initData();
    this.getData();
  },
  computed: {},
  methods: {
    ...mapMutations(["setTaskInfo"]),
    async initData() {
      try {
        this.getMyTaskList();
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },
    async getData() {
      let { msg, status, data, page } = await this.handleGet(getTaskList);
      data.map(task => {
        task.SENDDEPARTMENT = task.SENDDEPARTMENT.split(",");
      });
      this.taskData = data;
      this.page = Object.assign({}, page);
    },
    handleCurrentChange(currentPage) {
      this.page.currentPage = currentPage;
      this.getData();
    },
    checkTaskDetail(row) {
      this.setTaskInfo(Object.assign({}, row));
      this.$router.push({
        name: "taskDetail"
      });
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.table_container {
  padding: 20px;
}
.Pagination {
  display: flex;
  justify-content: flex-start;
  margin-top: 8px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
