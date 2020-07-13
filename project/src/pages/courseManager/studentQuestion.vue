<template>
    <div class="questions">
        <div class="information_left">
            <!-- 表格开始 -->
            <el-table
                :data="courseInfo.list" 
                style="width: 100%" @row-click="openInformations" size='small' empty-text='暂无数据'>
                <el-table-column
                    prop="id"
                    label="序号"
                    width="70" align="center">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="名称"
                    width="240" align="center" show-overflow-tooltip>
                </el-table-column>
            </el-table>
            <!-- 表格结束 -->
            <!-- 分页开始 -->
            <div class="information_page">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :page-size="pagesize"
                    layout="total, prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>
            <!-- 分页结束 -->
        </div>
        <div class="information_right" v-if="isShow">
            <!-- 右边具体资料的头部 -->
            <div class="right_header">
                <div><span>当前课程：</span> <span>{{this.courseNameNow}}</span></div>
                <el-button type="success" size="small" @click="toAdd">提问</el-button>
            </div>
            <!-- 表格开始 -->
            <el-table
                :data="questionInfo"
                style="width: 100%" border size='small' empty-text='暂无数据'>
                <el-table-column
                    prop="id"
                    label="序号"
                    width="50" align="center">
                </el-table-column>
                <el-table-column
                    prop="comment"
                    label="提问"
                    width="220" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="提问时间"
                    width="170" align="center">
                    <template slot-scope="{row}">
                        <span>{{row.commentTime | dateParse}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="reply"
                    label="回复"
                    width="100" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="100" align="center">
                    <template slot-scope="scope">
                        <el-button @click="deleteRow(scope.row)" type="text" size="small">删除</el-button>
                        <el-button  type="text" size="small" @click="reply(scope.row)">回复</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 表格结束 -->
        </div>
        <div class="replace" v-else>您还未选中课程</div>
        <!-- 回复模态框开始 -->
        <el-dialog title='回复提问' :visible.sync="dialogVisible" width="50%">
            <!-- 表单开始 -->
			<el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
                <el-form-item label="提问内容">
                    <el-input v-model="form.comment" disabled size='small'></el-input>
                </el-form-item>
                <el-form-item label="提问时间">
                    <el-input v-model="form.commentTime" disabled size='small'></el-input>
                </el-form-item>
                <el-form-item label="回复">
                    <el-input type="textarea" v-model="form.reply" size='small'></el-input>
                </el-form-item>
            </el-form>
            <!-- 表单结束 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size='small'>取 消</el-button>
                <el-button type="success" @click="toSave" size='small'>确 定</el-button>
            </span>
        </el-dialog>
        <!-- 回复模态框结束 -->
        <!-- 新增提问模态框开始 -->
        <el-dialog title='新增提问' :visible.sync="dialogVisible2" width="50%">
            <!-- 表单开始 -->
			<el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
                <el-form-item label="提问内容">
                    <el-input v-model="form.comment" size='small'></el-input>
                </el-form-item>
                <el-form-item label="课程名称">
                    <el-input v-model="form.courseId" size='small' label="this.courseNameNow"></el-input>
                </el-form-item>
            </el-form>
            <!-- 表单结束 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false" size='small'>取 消</el-button>
                <el-button type="success" @click="toSave" size='small'>确 定</el-button>
            </span>
        </el-dialog>
        <!-- 新增提问模态框结束 -->
    </div>
</template>
<script>
import {mapActions,mapState} from "vuex";
export default {
    data(){
        return{
            page:1,
            total:100,
            pagesize:8,
            isShow:false,
            courseNameNow:'',
            courseIdNow:'',
            dialogVisible:false,
            dialogVisible2:false,
            form:{},
            rules: {
                reply: [
                    { required: true, message: '请回复'}
                ]
            },
        }
    },
    created(){
        this.load()
    },
    computed:{
        ...mapState('coursePublish',['courseInfo']),
        ...mapState('questions',['questionInfo']),
        ...mapState('user',['data']),
    },
    methods:{
        ...mapActions('coursePublish',['loadCourse']),
        ...mapActions('questions',['loadQuestion','saveReply','saveQuestion','deleteQuestion']),
        // 删除
        deleteRow(row) {
            // console.log(row);
            this.$confirm('此操作将永久删除该问题, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
				}).then(() => {
					this.deleteQuestion(row.id).then(r=>{
				    this.loadQuestion(this.courseIdNow)
                    this.$notify({
                        title: '成功',
                        message: '删除成功',
                        type:'success'
                    })
                })
				}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});
        },
        // 保存回复
		toSave(){
            this.dialogVisible = false
            this.dialogVisible2 = false
            this.form.courseId = this.form.courseId?this.courseIdNow:''
            // console.log(this.form);
            if(this.form.id){
                this.saveReply(this.form).then(r=>{
                    this.loadQuestion(this.courseIdNow)
                    this.$notify({
                        title: '成功',
                        message: '回复成功',
                        type:'success'
                    })
                })
            }else{
                this.saveQuestion(this.form).then(r=>{
                    this.loadQuestion(this.courseIdNow)
                    this.$notify({
                        title: '成功',
                        message: '新增提问成功',
                        type:'success'
                    })
                })
            }
        },
        // 新增问题
        toAdd(){
			this.dialogVisible2 = true
            this.form = {
                comment:'',
                commentTime:Date.parse(new Date()),
                userId:this.data.id,
                courseId:this.courseNameNow
            }
		},
        // 回复
        reply(row){
            // console.log(row);
            let date = new Date(row.commentTime);
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            let D = (date.getDate()< 10 ? '0'+date.getDate() : date.getDate())+' ';
            let h = (date.getHours()< 10 ? '0'+date.getHours() : date.getHours())+ ':';
            let m = (date.getMinutes()< 10 ? '0'+date.getMinutes() : date.getMinutes())+ ':';
            let s = (date.getSeconds()< 10 ? '0'+date.getSeconds() : date.getSeconds());
            this.form={
                comment:row.comment,
                commentTime:Y+M+D+h+m+s,
                reply:row.reply,
				id:row.id,
                replyTime:Date.parse(new Date())
            }
            this.dialogVisible = true
        },
        // 点击某一行
        openInformations(row){
            // 根据课程id加载资料
            this.loadQuestion(row.id)
            this.courseNameNow = row.name
            this.courseIdNow = row.id
            this.isShow = true
        },
        // 分页触发事件
    	handleCurrentChange(page){
    		this.page = page
    		this.load()
        },
        load(){
            // 加载所有课程信息
            let obj = {
                page:this.page,
                pageSize:this.pagesize
            }
            this.loadCourse(obj).then(r=>{
                this.total = this.courseInfo.total
            })
        }
    }
}
</script>
<style scoped>
    .information_left{
        width: 30%;
        float: left;
        margin-right: 20px;
    }
    .information_right{
        width: 65%;
        padding: 10px;
        float: right;
    }
    .replace{
        color: red;
        font-size: 12px;
        padding: 10px;
    }
    /* 成功的按钮 */
    .el-button--success{
        background: #2cb5ac;
        border-color: #2cb5ac;
        margin: 10px 0 10px 0;
    }
    .el-button--success:hover{
        background: #56c4bd;
        border-color: #56c4bd;
    }
    /* 所有的文字按钮 */
    .el-button--text{
        color: #2CB5AC;
    }
    .el-button--text:hover{
        color: #56c4bd;
    }
    .right_header{
        margin-bottom: 10px;
    }
    .right_header>div>span:first-child{
        font-weight: bold;
    }
</style>