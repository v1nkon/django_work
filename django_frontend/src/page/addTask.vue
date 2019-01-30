<template>
  <div>
    <head-top></head-top>
    <el-row style="margin-top: 20px;">
      <el-col :span="18" :offset="4">
        <header class="form_header" v-html="title"></header>
        <el-form
          :model="taskForm"
          :rules="taskRules"
          ref="taskForm"
          label-width="110px"
          class="form food_form"
        >
          <el-form-item label="任务标题" prop="TITLE">
            <el-input
              :name="'TITLE'"
              v-show="!!isUpdate"
              v-model="taskForm.TITLE"
              auto-complete="off"
            ></el-input>
            <span v-show="!!!isUpdate" v-html="taskForm.TITLE"></span>
          </el-form-item>
          <el-form-item label="任务类型" prop="TYPE">
            <el-select v-show="!!isUpdate" v-model="taskForm.TYPE" placeholder="请选择">
              <el-option
                v-for="item in attributes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span v-show="!!!isUpdate" v-html="statusCn"></span>
          </el-form-item>
          <el-form-item label="是否需要反馈" prop="ISFEEDBACK">
            <el-radio-group v-show="!!isUpdate" v-model="taskForm.ISFEEDBACK" size="medium">
              <el-radio border label="Y">是</el-radio>
              <el-radio border label="N">否</el-radio>
            </el-radio-group>
            <span v-show="!!!isUpdate" v-html="toFeedbackCN(taskForm.ISFEEDBACK)"></span>
          </el-form-item>
          <el-form-item :label=" isUpdate? '选择下发单位' : '下发单位'" prop="SENDDEPARTMENT">
            <el-select
              v-show="!!isUpdate"
              v-model="taskForm.SENDDEPARTMENT"
              multiple
              placeholder="请选择"
            >
              <el-option
                v-for="item in sendDep"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span v-show="!!!isUpdate" v-html="SENDDEPARTMENTCN"></span>
          </el-form-item>
          <el-form-item label="内容">
            <el-input v-show="!!isUpdate" type="textarea" v-model="taskForm.CONTENT" :rows="3"></el-input>
            <span v-show="!!!isUpdate" v-html="taskForm.CONTENT"></span>
          </el-form-item>
          <el-form-item v-if="!!isUpdate" label="上传附件">
            <el-upload
              v-if="!!isUpdate"
              ref="elUpload"
              action
              drag
              :show-file-list="true"
              :on-success="submitSuccess"
              :auto-upload="false"
              multiple
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖拽到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip">最多上传3个文件，每个文件不超过10M</div>
            </el-upload>
          </el-form-item>
          <el-form-item v-if="!isAdd" label="附件">
            <ul class="el-upload-list el-upload-list--text">
              <li
                v-for="(item,index) in taskForm.TASKFILEDIR"
                :key="index"
                :tabindex="index"
                class="el-upload-list__item is-ready"
              >
                <a class="el-upload-list__item-name">
                  <i class="el-icon-document"></i>
                  <a :href="'/'+item">{{getFileName(item)}}</a>
                </a>
                <label class="el-upload-list__item-status-label">
                  <i class="el-icon-upload-success el-icon-circle-check"></i>
                </label>
                <span v-if="isUpdate">
                  <i class="el-icon-close" @click="deleteFile(index)"></i>
                  <i class="el-icon-close-tip">按 delete 键可删除</i>
                </span>
              </li>
            </ul>
            <!-- <a v-for="(item,index) in taskForm.TASKFILEDIR" :href="'/'+item" :key="index">
							{{getFileName(item)}}
            </a>-->
          </el-form-item>
          <el-form-item v-if="!isAdd">
            <el-button
              size="small"
              v-if="!!isReady"
              type="primary"
              @click="sendDownConfirm(taskForm)"
              v-html="'下 发'"
            ></el-button>
            <el-button
              size="small"
              v-if="!isReady"
              type="primary"
              @click="approveConfirm(taskForm)"
              v-html="'审核通过'"
            ></el-button>
            <el-button
              size="small"
              v-if="!isReady"
              type="primary"
              @click="feedback(taskForm)"
              v-html="'反馈报告'"
            ></el-button>
            <span v-if="!isReady">
              <el-button
                size="small"
                v-if="!isUpdate"
                type="primary"
                @click="updateTaskForm"
                v-html="'修改'"
              ></el-button>
              <el-button
                size="small"
                v-if="isUpdate"
                type="primary"
                @click="submitTask( )"
                v-html="'保存'"
              ></el-button>
            </span>
          </el-form-item>
          <el-form-item v-if="isAdd" class="submit-btn">
            <el-button type="primary" v-html="'添加'" @click="submitTask( )"></el-button>
            <el-button type="primary" v-html="'添加并下发'" @click="submitTask('true')"></el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import mixin from "@/mixin/mixin";
import {
  addTask as addTaskApi,
  updateTask as updateTaskApi
} from "@/api/getDataByAxios";
export default {
  mixins: [mixin],
  props: {
    title: {
      type: String,
      default: "添加任务"
    },
    taskForm: {
      type: Object,
      default: () => {
        return {
          TITLE: "",
          TYPE: "2",
          ISFEEDBACK: "Y",
          SENDDEPARTMENT: ["001", "002"],
          CONTENT: "dsadsadsa",
          TASKSTATUS: "1",
          CREATOR: "0dsadsa"
        };
      }
    }
  },
  data() {
    return {
      taskRules: {
        TITLE: [{ required: true, message: "请输入任务名称", trigger: "blur" }],
        TYPE: [{ required: true, message: "请选择任务类型", trigger: "blur" }],
        ISFEEDBACK: [
          { required: true, message: "请选择是否反馈", trigger: "blur" }
        ],
        SENDDEPARTMENT: [
          { required: true, message: "请选择下发单位", trigger: "blur" }
        ]
      },
      attributes: [
        {
          value: "1",
          label: "通知"
        }
      ],
      sendDep: [
        {
          value: "001",
          label: "大撒大撒"
        }
      ],
      foodSpecs: "one",
      dialogFormVisible: false,
      specsForm: {
        specs: "",
        packing_fee: 0,
        price: 20
      },
      specsFormrules: {
        specs: [{ required: true, message: "请输入规格", trigger: "blur" }]
      }
    };
  },
  created() {
    this.initData();
    console.log("xxxxxxxxxxxxx");
  },
  computed: {
    statusCn: function() {
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
      return statusMap["" + this.taskForm.TASKSTATUS];
    },
    isReady: function() {
      return this.taskForm.TASKSTATUS == 0;
    },
    SENDDEPARTMENTCN: function() {
      return this.taskForm.SENDDEPARTMENT.join(",");
    }
  },
  methods: {
    async initData() {
      try {
      } catch (err) {
        console.log(err);
      }
    },
    submitTask(isSend) {
      this.formatParam().then(param => {
        if (!isSend) {
          this.handleSubmit("taskForm", param, addTaskApi, updateTaskApi).then(
            success => {
              // if( success ){
              // 	this.$router.push({
              // 		name: 'taskList'
              // 	})
              // }
            }
          );
        }
      });
    },
    updateTaskForm() {
      this.setIsAdd(false);
      this.setIsUpdate(true);
    },
    defineFileSubmit(...list) {
      console.log("xxxxxxxxxxxx");
      console.log(list);
    },
    submitSuccess() {
      this.$router.push({
        name: "taskList"
      });
    },
    deleteFile(index) {
      this.taskForm.TASKFILEDIR = this.taskForm.TASKFILEDIR.splice(index, 1);
    },
    beforeUpload(file) {
      console.log(file);
    },
    formatParam() {
      let self = this;
      return new Promise((resolve, reject) => {
        let formData = new FormData();
        // formData.append('test',"xxxxxxxxxxxxxxxxxxxxx")
        let param = Object.assign({}, this.taskForm);
        param.SENDDEPARTMENT = param.SENDDEPARTMENT.join(",");
        Object.keys(param).map(key => {
          console.log(key, param[key]);
          formData.append(key, param[key]);
        });

        // this.$refs.elUpload.$data.uploadFiles.map( file => {
        // 	console.log(file)
        // 	formData.append( 'file', file )
        // } )
        // self.$refs.elUpload.$el.children[0].children[1].files.map( file => {
        // 	formData.append( 'file', file )
        // } )
        self.$refs.elUpload.$data.uploadFiles.map(file => {
          formData.append("file", file.raw);
        });
        // formData.append( 'file', self.$refs.elUpload.$el.children[0].children[1].files[0] )
        console.log(formData);
        // param.file = this.$refs.elUpload.$data.uploadFiles
        resolve(formData);
      });
    },
    submitcategoryForm() {},
    toFeedbackCN(feedback) {
      return feedback == "Y" ? "是" : "否";
    },
    getFileName(url) {
      let index = url.lastIndexOf("/"),
        fileName = "";

      if (fileName != -1) {
        fileName = url.slice(index + 1);
      }
      return fileName;
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.form {
  min-width: 400px;
  margin-bottom: 30px;
  &:hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
    border-radius: 6px;
    transition: all 400ms;
  }
}
.el-upload-dragger {
  height: 190px !important;
}
.food_form {
  border: 1px solid #eaeefb;
  padding: 10px 10px 0;
}
.form_header {
  text-align: center;
  margin-bottom: 10px;
}
.category_select {
  border: 1px solid #eaeefb;
  padding: 10px 30px 10px 10px;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
}
.add_category_row {
  height: 0;
  overflow: hidden;
  transition: all 400ms;
  background: #f9fafc;
}
.showEdit {
  height: 185px;
}
.add_category {
  background: #f9fafc;
  padding: 10px 30px 0px 10px;
  border: 1px solid #eaeefb;
  border-top: none;
}
.add_category_button {
  text-align: center;
  line-height: 40px;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  border: 1px solid #eaeefb;
  border-top: none;
  transition: all 400ms;
  &:hover {
    background: #f9fafc;
    span,
    .edit_icon {
      color: #20a0ff;
    }
  }
  span {
    .sc(14px, #999);
    transition: all 400ms;
  }
  .edit_icon {
    color: #ccc;
    transition: all 400ms;
  }
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
.cell {
  text-align: center;
}

.submit-btn {
  .el-form-item__content {
    margin-left: 0 !important;
    text-align: center;
  }
}
</style>
