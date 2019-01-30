<template>
    <div class="fillcontain">
        <div class="table_container">
            <head-top></head-top>
            <el-row>
                <el-col :span="14" :offset="4">
                    <div class="user-info">
                        <el-form :model="taskInfo">
                            <el-row>
                                <el-col>
                                    <el-form-item label="任务标题" label-width="100px">
                                        <el-input v-show="!!isUpdate" v-model="taskInfo.TITLE" auto-complete="off"></el-input>
                                        <span v-show="!!!isUpdate" v-html="taskInfo.TITLE"> </span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="任务类型" label-width="100px">
                                        <el-input v-show="!!isUpdate" v-model="taskInfo.TYPE" auto-complete="off"></el-input>
                                        <span v-show="!!!isUpdate" v-html="taskInfo.TYPE"> </span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="任务状态" label-width="100px">
                                        <el-input v-show="!!isUpdate" v-model="taskInfo.status" auto-complete="off"></el-input>
                                        <!-- <span v-show="!!!isUpdate" v-html="taskInfo.status"> </span> -->
                                        <el-tag v-show="!!!isUpdate" type="primary">{{ statusCn }}</el-tag>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="是否需要反馈" label-width="100px">
                                        <!-- <el-input v-show="!!isUpdate" v-model="taskInfo.ISFEEDBACK" auto-complete="off"></el-input> -->
                                        <!-- <span v-show="!!!isUpdate" v-html="taskInfo.ISFEEDBACK"> </span> -->
                                        <el-switch active-text="是" inactive-text="否" active-value="true" inactive-value="false" v-model="taskInfo.ISFEEDBACK"></el-switch>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="下发单位" label-width="100px">
                                        <el-input v-show="!!isUpdate" v-model="taskInfo.SENDDEPARTMENT" auto-complete="off"></el-input>
                                        <span v-show="!!!isUpdate" v-html="taskInfo.SENDDEPARTMENT"> </span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="附件" label-width="100px">
                                        <div v-show="!!!isUpdate" v-if="taskInfo.FILE">
                                            <span v-for=" (item,index) in taskInfo.TASKFILEDIR" :key="index">
                                                {{item}}
                                            </span>
                                        </div>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="内容" label-width="100px">
                                        <el-input v-show="!!isUpdate" v-model="taskInfo.CONTENT" auto-complete="off"></el-input>
                                        <span class="break-word" v-show="!!!isUpdate" v-html="taskInfo.CONTENT"> </span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button size="small" v-if="!!isReady" type="primary" @click="sendDownConfirm" v-html="'下 发'"></el-button>
                            <el-button size="small" v-if="!isReady" type="primary" @click="approveConfirm" v-html="'审核通过'"></el-button>
                            <el-button size="small" v-if="!isReady" type="primary" @click="feedback" v-html="'反馈报告'"></el-button>
                            <el-button size="small" v-if="!isReady" type="primary" @click="updateTaskForm" v-html="'修改'"></el-button>
                        </div>
                        <!-- <div slot="footer" class="dialog-footer" v-if="!isSuper">
                            <el-button size="small" type="primary" v-show="!isUpdate" @click="updatetaskInfo" v-html="'修 改'"></el-button>
                            <el-button size="small" type="primary"  v-show="isUpdate" @click="submittaskInfo('taskInfoForm')" v-html="'保 存'"></el-button>
                            <el-button size="small" type="primary" v-show="isUpdate" @click="calceltaskInfo('taskInfoForm')" v-html="'取 消'"></el-button>
                        </div> -->
                    </div>
                </el-col>
            </el-row>

            <el-dialog  title="反馈报告" :visible.sync="feedbackShow">
                <el-form :model="feedbackModel">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="反馈内容" label-width="100px">
                                <el-input 
                                    type="textarea" 
                                    v-model="feedbackModel.content" 
                                    auto-complete="off" 
                                    :rows="3"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitFeedback()" v-html="'确认'"></el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import mixin from '@/mixin/mixin'
import headTop from '../components/headTop'
import { getTaskDetail } from '@/api/getDataByAxios' 
export default {
    mixins: [mixin],
    data() {
        return {
            feedbackShow:false,
            feedbackModel:{
                content:''
            }
        }
    },
    computed: {
        ...mapState(['taskInfo']),
        statusCn:function(){
            let statusMap = {
                '0':'新建（未下发）',
                '1':'审批中',
                '2':'审批未通过',
                '3':'执行中',
                '4':'执行中（逾期）',
                '5':'未完成',
                '6':'逾期完成',
                '7':'完成'
            }
            return statusMap[''+this.taskInfo.TASKSTATUS]
        },
        isReady:function(){
            return this.taskInfo.TASKSTATUS == 0
        }
    },
    created () {
        
        if( !this.taskInfo.TITLE ){

            this.$router.push({
                name: 'taskList'
            })
        }

    },
    methods: {
        sendTaskConfirm(  ) {
            this.$confirm('确认上报？').then( _ => { this.sendTask(  ) }, _ => {  })
        },
        sendTask:function(){
            
        },
        sendDownConfirm(  ) {
            this.$confirm('确认下发？').then( _ => { this.sendTask(  ) }, _ => {  })
        },
        sendDown:function(){
            
        },
        approveConfirm(){
            this.$confirm('确认审核通过?').then( _=>{ this.approve( ) }, _ => {  } )
        },
        approve(){

        },
        feedback(){
            this.feedbackShow = true
        },
        updateTaskForm(){
            this.setIsUpdate(true)
        },
        submittaskInfo(formName) {
            let params = Object.assign({},this.taskInfo)
            this.handleSubmit(formName, params, updatetaskInfo, updatetaskInfo, "修改成功").then(() => {  this.handleAdd(); this.gettaskInfo(); })
        },
        calceltaskInfo(){
            this.handleAdd()
        },
        updateUserPassword(adUserId){
            this.adUserId = adUserId
            this.$refs.pwdDialog.openUpdatePwd()
        },
        updatePwdCallback(){
            this.logOut().then( ()=> this.$router.push('login') )
        },
    }
}
</script>

<style lang="less">
@import '../style/mixin';
.explain_text {
    margin-top: 20px;
    text-align: center;
    font-size: 20px;
    color: #333;
}
.break-word{
    word-break: break-word;
    display: block;
}
.user-info{
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
        transition: all .5s;
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
