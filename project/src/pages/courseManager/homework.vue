<template>
    <div class="homework">
        <div class="information_left">
            <!-- 表格开始 -->
            <el-table
                :data="courseInfo.list" 
                style="width: 100%" @row-click="openHomeworks" size='small' empty-text='暂无数据'>
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
                <el-button type="success" size="small" @click="toAdd">增加习题</el-button>
            </div>
            <!-- 表格开始 -->
            <el-table
                :data="homeworkInfo"
                style="width: 100%" border size='small' empty-text='暂无数据'>
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item>
                                <span>
                                    <div v-for="item in props.row.options" :key="item.id">
                                        <span>{{item.label}}</span>
                                        <span>{{item.name}}</span>
                                    </div>
                                    <div class="answer">正确答案：{{props.row.answer}}</div>
                                </span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="id"
                    label="序号"
                    width="50" align="center">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="名称"
                    min-width="220" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="类型"
                    width="100" align="center">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="100" align="center">
                    <template slot-scope="scope">
                        <el-button @click="deleteRow(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 表格结束 -->
        </div>
        <div class="replace" v-else>您还未选中课程</div>
        <!-- 模态框开始 -->
        <el-dialog title='增加习题' :visible.sync="dialogVisible" width="50%">
            <!-- {{form}} -->
            <!-- 表单开始 -->
			<el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
                <el-form-item label="题目名称" prop="name" >
                    <el-input v-model="form.name" placeholder="资料名称" size='small'></el-input>
                </el-form-item>
                <el-form-item label="题目类型" prop="type">
                    <el-select v-model="form.type" placeholder="请选择资料类型" size='small'>
                        <el-option v-for="item in homeworks" :key="item.id" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="题目选项" v-if="form.type != '简答题'">
                    <!-- 表格开始 -->
                    <el-table
                        :data="form.options"
                        style="width: 100%" size='small' empty-text='暂无数据' border>
                        <el-table-column
                            label="序号"
                            width="60">
                            <template slot-scope="{$index}">
                                {{$index + 1}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="label"
                            label="label"
                            width="60">
                        </el-table-column>
                        <el-table-column
                            label="选项" show-overflow-tooltip>
                            <template slot-scope="{row}">
                                  <el-input v-model="row.name" size='small'></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 表格结束 -->
                    <!-- 只要选项有了四个，那么添加按钮就会隐藏 -->
                    <el-button type="text" v-if="form.options.length<4" @click="addOption">添加</el-button>
                </el-form-item>
                <el-form-item label="答案" prop="answer">
                    <el-input type="textarea" v-model="form.answer" size='small'></el-input>
                </el-form-item>
            </el-form>
            <!-- 表单结束 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size='small'>取 消</el-button>
                <el-button type="success" @click="toSave" size='small'>确 定</el-button>
            </span>
        </el-dialog>
        <!-- 模态框结束 -->
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
            homeworks:['单选题','多选题','简答题'],
            dialogVisible:false,
            form:{
                options:[]
            },
            rules: {
                name: [
                    { required: true, message: '请输入题目名称', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择'}
                ],
                answer:[
                    { required: true, message: '请输入答案'}
                ],
            },
        }
    },
    created(){
        this.load()
    },
    computed:{
        ...mapState('coursePublish',['courseInfo']),
        ...mapState('homework',['homeworkInfo']),
    },
    methods:{
        ...mapActions('coursePublish',['loadCourse']),
        ...mapActions('homework',['loadHomework','saveHomework','deleteHomework']),
        // 模态框上添加选项
        addOption(){
            let option = {}
            let label = ''
            // 根据选项的长度为判断来给label赋值
            switch(this.form.options.length){
                case 0:
                    label = 'A';
                    break;
                case 1:
                    label = 'B';
                    break;
                case 2:
                    label = 'C';
                    break;
                case 3:
                    label = 'D';
                    break;
            }
            option.label = label
            this.form.options.push(option)
        },
        // 删除
        deleteRow(row) {
            // console.log(row);
            this.$confirm('此操作将永久删除该作业, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
				}).then(() => {
					this.deleteHomework(row.id).then(r=>{
				    this.loadHomework(this.courseIdNow)
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
        // 保存新增的习题
		toSave(){
            this.dialogVisible = false
			// console.log(this.form);
			this.saveHomework(this.form).then(r=>{
				this.loadHomework(this.courseIdNow)
				let messageInfo = ''
				if(this.form.id){
					messageInfo = '修改'
				}else{
					messageInfo = '新增'
				}
				this.$notify({
					title: '成功',
					message: messageInfo+'成功',
					type:'success'
				})
			})
        },
        // 新增
        toAdd(){
			this.dialogVisible = true
			this.form={
				name:'',
                type:'',
                courseId:this.courseIdNow,
                options:[]
            }
		},
        // 点击某一行
        openHomeworks(row){
            // 根据课程id加载作业
            this.loadHomework(row.id)
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
    /* .information{
        padding: 10px;
    } */
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
    .answer{
        color: red;
        font-size: 12px;
        font-weight: bold;
    }
    /* 右边表格打开具体习题的内容里每行的高度 */
    .demo-table-expand .el-form-item>span>div{
        line-height: 20px !important;
    }
    .el-form-item content{
        line-height: 20px !important;
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
    .right_header>div>span:first-child{
        font-weight: bold;
    }
    .el-dialog .el-select{
        width: 100%;
        
    }
    /* 模态框上面文字按钮的位置 居右 */
    .el-dialog .el-button--text{
        margin-left: 450px;
    }
</style>