<template>
  <task-form :title="title" :taskForm="Object.assign( {}, taskInfo)"></task-form>
</template>

<script>
import mixin from "@/mixin/mixin";
import taskForm from "@/page/addTask";
import { mapState, mapMutations } from "vuex";
export default {
  mixins: [mixin],
  data() {
    return {
      title: "任务详情"
    };
  },
  computed: {
    ...mapState(["taskInfo"])
  },
  created() {
    if (!this.taskInfo.TITLE) {
      this.$router.push({
        name: "taskList"
      });
    }
  },
  methods: {
    sendTaskConfirm() {
      this.$confirm("确认上报？").then(
        _ => {
          this.sendTask();
        },
        _ => {}
      );
    },
    sendTask: function() {},
    sendDownConfirm() {
      this.$confirm("确认下发？").then(
        _ => {
          this.sendTask();
        },
        _ => {}
      );
    },
    sendDown: function() {},
    approveConfirm() {
      this.$confirm("确认审核通过?").then(
        _ => {
          this.approve();
        },
        _ => {}
      );
    }
  },
  components: {
    taskForm
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.explain_text {
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
  color: #333;
}
.break-word {
  word-break: break-word;
  display: block;
}
.user-info {
  // max-width: 800px;
  // margin: 0 auto;
  .el-form {
    margin-bottom: 10px;
  }
  .el-row {
    padding: 10px 20px;
    border-bottom: 1px solid #ccc;
  }
  .el-form-item {
    margin: 0;
  }
  .el-form-item__label {
    text-align: left;
  }
  .el-form-item__content {
    color: #8c8c8c;
  }
  a.update-pwd {
    float: right;
    color: #f57e7e;
    transition: all 0.5s;
  }
  a.update-pwd:hover {
    color: #298cf3;
  }
  .el-form-item.is-required .el-form-item__label:before {
    position: absolute;
    left: 10px;
    top: 12px;
  }
  .dialog-footer {
    text-align: right;
  }
}
</style>
