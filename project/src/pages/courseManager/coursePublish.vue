<template>
    <div class="coursePublish">
        <div class="coursePublish_button">
            <div>
                <el-select v-model="value1" placeholder="请选择年级" clearable size='small' >
                    <el-option v-for="item in grade" :key="item.id" :label="item" :value="item"></el-option>
                </el-select>
                <el-select v-if="isShow" v-model="value2" placeholder="请选择学科" clearable size='small'>
                    <el-option v-for="item in subject" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <el-input placeholder="请输入课程名称关键字" v-model="input" clearable size="small"></el-input>
                <el-button type="text" size="small" @click="search">搜索</el-button>
                <el-button type="primary" size='small' @click="toAdd">新增</el-button>
            </div>
		</div>
        <!-- 表格开始 -->
        <el-table
            :data="courseInfo.list"
            style="width: 100%" size='small' empty-text='暂无数据'>
            <el-table-column
                prop="id"
                label="序号"
                width="50" align="center">
            </el-table-column>
            <el-table-column
                prop="name"
                label="名称"
                width="180" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="subject.name"
                label="学科"
                width="100" align="center">
            </el-table-column>
            <el-table-column
                label="创建时间"
                width="180" align="center">
                <template slot-scope="{row}">
					<span>{{row.createTime | dateParse}}</span>
				</template>
            </el-table-column>
            <el-table-column
                label="状态"
                width="180" align="center">
                <template slot-scope="{row}">
                    <div v-if="row.status=='未审核'" class="checkstatus statusPass">{{row.status}}</div>
                    <div v-else class="checkstatus statusNo">{{row.status}}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="introduce"
                label="介绍" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100" align="center">
                <template slot-scope="scope">
                    <el-button @click="deleteRow(scope.row)" type="text" size="small">删除</el-button>
                    <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 表格结束 -->
        <!-- 分页开始 -->
		<div class="coursePublish_page">
			<el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[3, 5, 8, 10]"
                :page-size="pagesize"
                layout="sizes, prev, pager, next"
                :total="total">
            </el-pagination>
		</div>
        <!-- 分页结束 -->
        <!-- 模态框开始 -->
        <el-dialog :title='title' :visible.sync="dialogVisible" width="50%">
            <!-- {{form}} -->
            <!-- 表单开始 -->
			<el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name" placeholder="请输入年级名称" size='small'></el-input>
                </el-form-item>
                <el-form-item label="所属学科" prop="gradeId">
                    <el-select v-model="form.subjectId" placeholder="请选择所属年级" size='small'>
                        <el-option v-for="item in subjectInfo.list" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="介绍" prop="introduce">
                    <el-input type="textarea" v-model="form.introduce" placeholder="请对此年级进行介绍" size='small'></el-input>
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
            pagesize:5,
            input:'',
            dialogVisible:false,
            title:'新增课程信息',
            form:{},
            select: '',
            grade:[],   //年级可供选择的值
            subject:[],   //根据年级选择的值可供选择的学科
            value1:'',   //年级选择的值
            value2:'',  //根据年级来选择的学科
            isShow:false,  //控制学科下拉框的显示
            rules: {
                name: [
                    { required: true, message: '请输入年级名称', trigger: 'blur' }
                ],
                introduce: [
                    { required: true, message: '请进行介绍'}
                ]
            }
        }
    },
    created(){
        this.load();
    },
    // 监听下拉框select的变化，改变就查询
    watch:{
        value1:function(old,news){
            // console.log(this.value1);
            this.isShow = this.value1?true:false
            let obj2 = {
                page:1,
                pageSize:1000
            }
            this.loadSubject(obj2).then(r=>{
                this.subject = []
                // 将根据年级名次获取的学科赋给下拉框
                this.subjectInfo.list.forEach((item,index)=>{
                    if(item.grade.name == this.value1){
                        this.subject.push(item)
                    }
                })
            })
        },
        input:function(old,news){
            // console.log(this.input);
            let obj = {
                page:this.page,
                pageSize:this.pagesize,
                name:this.input
            }
            this.loadCourse(obj).then(res=>{
				this.total = this.courseInfo.total
			})
        }
    },
    computed:{
        ...mapState('coursePublish',['courseInfo']),
        ...mapState('subjectManager',['subjectInfo']),
    	...mapState('gradeManager',['gradeInfo'])
	},
    methods:{
        ...mapActions('coursePublish',['loadCourse','deleteCourse','saveCourse']),
        ...mapActions('subjectManager',['loadSubject']),
        ...mapActions('gradeManager',['loadGrade']),
        search(){
            if(this.input){
                this.form.name = this.input
            }
            if(this.value2){
                this.form.subjectId = this.value2
                this.form.page = 1,
                this.form.pageSize = 1000
            }else{
                this.form.page = this.page,
                this.form.pageSize = this.pagesize
            }
            console.log(this.form);
            this.loadCourse(this.form).then(r=>{
                this.form = {}
                this.value2 = ''
            })
        },
        // 保存发布课程的信息
		toSave(){
			this.dialogVisible = false
			console.log(this.form);
			this.saveCourse(this.form).then(r=>{
				this.load()
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
                introduce:'',
                subjectId:''
			}
		},
        // 修改
        edit(row) {
            // console.log(row);
            this.dialogVisible = true
            this.form.name = row.name
            this.form.introduce = row.introduce
            this.form.status = row.status
            this.form.createTime = row.createTime
            this.form.opinion = row.opinion
            this.form.subjectId = row.subjectId
            this.form.userId = row.userId
            this.form.id = row.id
            this.title = '修改课程信息'
        },
        // 删除
        deleteRow(row) {
            // console.log(row);
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
				}).then(() => {
					this.deleteCourse(row.id).then(r=>{
                    this.load()
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
        // 改变pageSize
        handleSizeChange(val){
            this.pagesize = val
            this.load()
        },
        // 分页触发事件
    	handleCurrentChange(page){
    		this.page = page
    		this.load()
        },
        // 加载所有课程信息
        load(){
            let obj = {
				page:this.page,
				pageSize:this.pagesize
			}
            this.loadCourse(obj).then(r=>{
                this.total = this.courseInfo.total
            })
            // 加载所有年级信息
            let obj2 = {
                page:1,
                pageSize:10000
            }
            this.loadGrade(obj2).then(r=>{
                // 将年级名称去重之后再给下拉框
                let arr = []
                this.gradeInfo.list.forEach(function(item,index){
                    arr.push(item.name)
                })
                arr.forEach(item=>{
                    if(this.grade.indexOf(item) == -1){
                        this.grade.push(item)
                    }
                })
            })
            // 加载所有课程信息为模态框
            let obj3 = {
                page:1,
                pageSize:10000
            }
            this.loadSubject(obj3)
        }
    }
}
</script> 
<style scoped>
    .coursePublish{
        padding: 10px;
    }
    .coursePublish_button .el-select,.coursePublish_button .el-input{
        width: 20%;
    }
    .coursePublish_button .el-select{
        margin-right: 20px;
    }
    .coursePublish_button .el-button:last-child{
        float: right;
        background-color:#2CB5AC
    }
    .coursePublish_button .el-button:last-child:hover{
        background: #56c4bd;
        border-color: #56c4bd;
    }
    .checkstatus{
        display: inline-block;
        border-radius: 5px;
        padding: 0 5px;
        font-size: 12px;
    }
    .statusPass{
        color: red;
        background-color: #ffeded;
    }
    .statusNo{
        color: green;
        background-color: #e7faf0;
    }
    .el-dialog .el-select{
        width: 100%;
    }
    /* 所有的文字按钮 */
    .el-button--text{
        color: #2CB5AC;
    }
    .el-button--text:hover{
        color: #56c4bd;
    }
    /* 成功的按钮 */
    .el-button--success{
        background: #2cb5ac;
        border-color: #2cb5ac 
    }
    /* 模态框上面的按钮 */
    .dialog-footer .el-button:first-child:hover{
        color: #2cb5ac;
        background: #c0e9e6;
        border-color: #c0e9e6;
    }
    .dialog-footer .el-button:nth-child(2):hover{
        background: #56c4bd;
        border-color: #56c4bd;
    }
    .el-dialog__headerbtn:focus .el-dialog__close, .el-dialog__headerbtn:hover .el-dialog__close{
        color: #2cb5ac;
    }
    /* 下面的分页部分 */
    .el-pagination__sizes .el-input .el-input__inner:hover{
        border-color:#2CB5AC !important;
    }
    .el-select .el-input.is-focus .el-input__inner{
        border-color:#2CB5AC;
    }
    .el-select .el-input__inner:focus{
        border-color:#2CB5AC;
    }
    /* 上面的select框 */
    .el-select:hover .el-input__inner{
        border-color:#2CB5AC;
    }
    .el-select .el-input.is-focus .el-input__inner{
        border-color:#2CB5AC;
    }
    .el-select .el-input__inner:focus{
        border-color:#2CB5AC;
    }
    .el-select .el-input.is-focus .el-input__inner{
        border-color:#2CB5AC;
    }
    .el-input__inner:focus{border-color:pink}
</style>