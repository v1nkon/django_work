<template></template>

<script>
import headTop from "@/components/headTop";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      responseErrorModel: {
        status: 100,
        msg: "error",
        data: [],
        page: {
          totalPage: 0,
          currentPage: 1,
          pageSize: 1,
          sortType: "desc"
        }
      },
      page: {
        totalPage: 0,
        currentPage: 1,
        pageSize: 10,
        sortType: "desc"
      }
    };
  },
  created() {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.path.indexOf("add") != -1) {
        vm.setIsAdd(true);
        vm.setIsUpdate(true);
      } else {
        vm.setIsAdd(false);
        vm.setIsUpdate(false);
      }
    });
  },
  computed: {
    ...mapState(["isAdd", "isUpdate"])
  },
  methods: {
    // ...mapMutations(['setUpdate', 'setGap', 'setAutoIncrement']),
    ...mapMutations(["setIsUpdate", "setIsAdd"]),
    async handleGet(getApi, page, id) {
      page = page || this.page;
      let res = await getApi({ ...page }, id);
      let { isError } = res;
      if (isError) {
        return this.responseErrorModel;
      } else {
        return res;
      }
    },
    getStatusCn(statusCode) {
      let statusMap = {
        "0": "新建（未下发）",
        "1": "审批中",
        "2": "审批未通过",
        "3": "执行中",
        "4": "执行中（逾期）",
        "5": "未完成",
        "6": "逾期完成",
        "7": "完成"
      };
      return statusMap["" + statusCode];
    },
    handleAdd() {
      this.setUpdate(false);
    },
    async handleDelete(ids, deleteApi, callback) {
      let { isError, message } = await deleteApi(ids);
      if (isError) {
        return;
      }
      callback();
      this.setAutoIncrement();
      this.$message({
        type: "success",
        message: "删除成功"
      });
    },
    handleUpdate(tableInfo = {}, row = {}) {
      this.setUpdate(true);
      return Object.assign(tableInfo, row);
    },
    async handleSubmit(formName, tableInfo, addApi, updateApi, addMessage) {
      return new Promise((resolve, reject) => {
        this.$refs[formName].validate(async valid => {
          if (valid) {
            let result = "";
            let message = "";
            if (this.isAdd) {
              message = addMessage || "添加成功";
              result = await addApi(tableInfo);
            } else {
              message = "修改成功";
              result = await updateApi(tableInfo);
            }

            if (result.isError) {
              reject();
            }
            resolve(result);
            this.$message({
              type: "success",
              message: message
            });
          } else {
            console.log("xxxxxx");
            this.$notify.error({
              title: "错误",
              message: "请检查输入是否正确",
              offset: 100
            });
            reject();
          }
        });
      });
    },
    throttle(fn, context) {
      var args = Array.prototype.slice.call(arguments, 2); //获取剩余参数 fn调用需要的参数
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      this.timeoutId = setTimeout(function() {
        fn.apply(context, args);
      }, 200);
    }
  },
  components: {
    headTop
  },
  watch: {},
  filters: {
    shortBrif: function(value) {
      let content = value.slice(0, 20);
      if (value.length > 20) {
        content += "...";
      }
      return content;
    }
  }
};
</script>
<style>
</style>