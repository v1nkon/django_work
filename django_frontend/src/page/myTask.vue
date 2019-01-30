<template>
  <div class="fillcontain">
    <div class="table_container">
      <head-top></head-top>
      <el-table
        :data="tableData"
        @expand="expand"
        :expand-row-keys="expendRow"
        :row-key="row => row.index"
        style="width: 100%"
      >
        <el-table-column label="任务名称" prop="name"></el-table-column>
        <el-table-column label="下发地市" prop="unit"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-tag type="primary">{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="Pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="count"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "@/mixin/mixin";
import { baseUrl, baseImgPath } from "@/config/env";
import {
  getMyTaskList,
  getMenu,
  updateFood,
  deleteFood,
  getResturantDetail,
  getMenuById
} from "@/api/getData";
export default {
  mixins: [mixin],
  data() {
    return {
      baseUrl,
      baseImgPath,
      restaurant_id: null,
      offset: 0,
      limit: 20,
      count: 0,
      tableData: [],
      currentPage: 1,
      selectTable: {},
      dialogFormVisible: false,
      menuOptions: [],
      selectMenu: {},
      selectIndex: null,
      specsForm: {
        specs: "",
        packing_fee: 0,
        price: 20
      },
      specsFormrules: {
        specs: [{ required: true, message: "请输入规格", trigger: "blur" }]
      },
      specsFormVisible: false,
      expendRow: []
    };
  },
  created() {
    this.restaurant_id = this.$route.query.restaurant_id;
    this.initData();
  },
  computed: {
    specs: function() {
      let specs = [];
      if (this.selectTable.specfoods) {
        this.selectTable.specfoods.forEach(item => {
          specs.push({
            specs: item.specs_name,
            packing_fee: item.packing_fee,
            price: item.price
          });
        });
      }
      return specs;
    }
  },
  methods: {
    async initData() {
      try {
        this.getMyTaskList();
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },
    async getMenu() {
      this.menuOptions = [];
      try {
        const menu = await getMenu({
          restaurant_id: this.selectTable.restaurant_id,
          allMenu: true
        });
        menu.forEach((item, index) => {
          this.menuOptions.push({
            label: item.name,
            value: item.id,
            index
          });
        });
      } catch (err) {
        console.log("获取食品种类失败", err);
      }
    },
    async getMyTaskList() {
      const Tasks = getMyTaskList({}, true);
      this.tableData = [];
      Tasks.forEach((item, index) => {
        const tableData = {};
        tableData.name = item.name;
        tableData.type = item.type;
        tableData.isFeed = item.isFeed;
        tableData.unit = item.unit;
        tableData.content = item.content;
        tableData.files = item.files;
        tableData.status = item.status;
        tableData.index = index;
        this.tableData.push(tableData);
      });
      this.count = Tasks.length || 0;
    },
    tableRowClassName(row, index) {
      if (index === 1) {
        return "info-row";
      } else if (index === 3) {
        return "positive-row";
      }
      return "";
    },
    addspecs() {
      this.specs.push({ ...this.specsForm });
      this.specsForm.specs = "";
      this.specsForm.packing_fee = 0;
      this.specsForm.price = 20;
      this.specsFormVisible = false;
    },
    deleteSpecs(index) {
      this.specs.splice(index, 1);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getMyTaskList();
    },
    expand(row, status) {
      if (status) {
        this.getSelectItemData(row);
      } else {
        const index = this.expendRow.indexOf(row.index);
        this.expendRow.splice(index, 1);
      }
    },
    handleEdit(row) {
      this.getSelectItemData(row, "edit");
      this.dialogFormVisible = true;
    },
    async getSelectItemData(row, type) {
      // const restaurant = await getResturantDetail(row.restaurant_id);
      // const category = await getMenuById(row.category_id)
      // this.selectTable = {...row, ...{restaurant_name: restaurant.name, restaurant_address: restaurant.address, category_name: category.name}};
      // this.selectMenu = {label: category.name, value: row.category_id}
      // this.tableData.splice(row.index, 1, {...this.selectTable});
      // this.$nextTick(() => {
      //     this.expendRow.push(row.index);
      // })
      // if (type == 'edit' && this.restaurant_id != row.restaurant_id) {
      // 	this.getMenu();
      // }
    },
    handleSelect(index) {
      this.selectIndex = index;
      this.selectMenu = this.menuOptions[index];
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
