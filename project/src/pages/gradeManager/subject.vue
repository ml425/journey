<template>
    <div class="subject">
        <div class="subject_button">
            <div>
                <el-select v-model="select" slot="prepend" placeholder="请选择学科" clearable size='small'>
                    <el-option v-for="item in subject" :key="item.id" :label="item" :value="item"></el-option>
                </el-select>
            </div>
            <el-button type="primary" size='small' @click="toAdd">新增</el-button>
		</div>
        <!-- 表格开始 -->
        <el-table
            :data="subjectInfo.list"
            style="width: 100%" size='small' empty-text='暂无数据'>
            <el-table-column
                prop="id"
                label="序号"
                width="80" align="center">
            </el-table-column>
            <el-table-column
                prop="name"
                label="名称"
                width="180" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                label="创建时间"
                width="180" align="center">
                <template slot-scope="{row}">
					<span>{{row.createTime | dateParse}}</span>
				</template>
            </el-table-column>
            <el-table-column
                prop="grade.name"
                label="所属年级"
                width="180" align="center">
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
		<div class="subject_page">
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
                <el-form-item label="名称" prop="name" >
                    <el-input v-model="form.name" placeholder="请输入学科名称" size='small'></el-input>
                </el-form-item>
                <el-form-item label="所属年级" prop="gradeId">
                    <el-select v-model="form.gradeId" placeholder="请选择所属年级" size='small'>
                        <el-option v-for="item in gradeInfo.list" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="介绍" prop="introduce">
                    <el-input type="textarea" v-model="form.introduce" placeholder="请对此学科进行介绍" size='small'></el-input>
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
            title:'新增学科信息',
            form:{
                name:'',
                introduce:'',
                gradeId:''
            },
            grade:[],
            rules: {
                name: [
                    { required: true, message: '请输入年级名称', trigger: 'blur' }
                ],
                introduce: [
                    { required: true, message: '请进行介绍'}
                ],
                gradeId: [
                    { required: true, message: '请选择所属年级'}
                ]
            },
            select: '',
            subject:[]
        }
    },
    created(){
        this.load();
    },
    // 监听下拉框select的变化，改变就查询
    watch:{
        select:function(old,news){
            // console.log(this.select);
            let obj = {
                page:this.page,
                pageSize:this.pagesize,
                name:this.select
            }
            this.loadSubject(obj).then(res=>{
				this.total = this.subjectInfo.total
			})
        }
    },
    computed:{
    	...mapState('subjectManager',['subjectInfo']),
    	...mapState('gradeManager',['gradeInfo'])
	},
    methods:{
        ...mapActions('subjectManager',['loadSubject','saveGrade','deleteGrade']),
        ...mapActions('gradeManager',['loadGrade']),
        // 保存学科信息
		toSave(){
            this.dialogVisible = false
            // 根据年级名称或年级id来获取年级id
			// console.log(this.form.gradeId);
            this.grade = this.gradeInfo.list.filter(item=>{ 
                return (item.name == this.form.gradeId) || (item.id == this.form.gradeId)
            })
            this.form.gradeId = this.grade[0].id
			// console.log(this.form);
			this.saveGrade(this.form).then(r=>{
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
				gradeId:''
            }
            // 获取当前时间戳
            this.form.createTime = Date.parse(new Date());
		},
        // 修改
        edit(row) {
            // console.log(row);
            this.dialogVisible = true
            this.form.name = row.name
            this.form.introduce = row.introduce
            this.form.gradeId = row.grade?row.grade.name:''
            this.form.id = row.id
            this.title = '修改学科信息'
        },
        // 删除
        deleteRow(row) {
            console.log(row);
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
				}).then(() => {
					this.deleteGrade(row.id).then(r=>{
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
        // 加载所有学科信息
        load(){
            let obj = {
				page:this.page,
				pageSize:this.pagesize
			}
            this.loadSubject(obj).then(r=>{
                this.total = this.subjectInfo.total
                // 将学科名称去重之后再给下拉框
                let arr = []
                this.subjectInfo.list.forEach(function(item,index){
                        arr.push(item.name)
                })
                arr.forEach(item=>{
                    if(this.subject.indexOf(item) == -1){
                        this.subject.push(item)
                    }
                })
            })
            // 加载所有年级信息
            let obj2 = {
                page:1,
                pageSize:10000
            }
            this.loadGrade(obj2)
        }
    }
}
</script> 
<style scoped>
    .subject{
        padding: 10px;
    }
    .subject_button>div:first-child{
        width: 20%;
        margin-right: 20px;
        display: inline-block;
    }
    .el-select{
        width: 100%;
    }
    .subject_button .el-button:nth-child(2){
        float: right;
        background-color:#2CB5AC
    }
    .subject_button .el-button:nth-child(2):hover{
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
</style>