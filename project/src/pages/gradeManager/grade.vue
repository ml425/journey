<template>
    <div class="grade">
        <div class="grade_button">
			<el-input placeholder="请输入年级名称关键字" v-model="input" clearable size="small"></el-input>
            <el-button type="text" size="small" @click="toQuery">搜索</el-button>
            <el-button type="primary" size='small' @click="toAdd">新增</el-button>
		</div>
        <!-- 表格开始 -->
        <el-table
            :data="gradeInfo.list"
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
		<div class="grade_page">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[3, 5, 8, 10]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next"
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
                    <el-input v-model="form.name" placeholder="请输入年级名称" size='small'></el-input>
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
            title:'新增年级信息',
            form:{
                name:'',
                introduce:''
            },
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
    // 监听输入框input的变化，改变就查询
    watch:{
        input:function(old,news){
            // console.log(this.input);
            let obj = {
                page:this.page,
                pageSize:this.pagesize,
                name:this.input
            }
            this.loadGrade(obj).then(res=>{
				this.total = this.gradeInfo.total
			})
        }
    },
    computed:{
    	...mapState('gradeManager',['gradeInfo'])
	},
    methods:{
        ...mapActions('gradeManager',['loadGrade','saveGrade','deleteGrade']),
        // 保存年级信息
		toSave(){
			this.dialogVisible = false
			console.log(this.form);
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
			}
		},
        // 修改
        edit(row) {
            // console.log(row);
            this.dialogVisible = true
            this.form.name = row.name
            this.form.introduce = row.introduce
            this.form.id = row.id
            this.title = '修改年级信息'
        },
        // 删除
        deleteRow(row) {
            // console.log(row);
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
        // 查询搜索
		toQuery(){
			this.page = 1
			let obj = {
				page:this.page,
				pageSize:this.pagesize,
				name:this.input
			}
			if(obj.name == ''){
				delete obj.name
			}
			this.loadGrade(obj).then(res=>{
				this.total = this.gradeInfo.total
			})
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
        // 加载所有年级信息
        load(){
            let obj = {
				page:this.page,
				pageSize:this.pagesize
			}
            this.loadGrade(obj).then(r=>{
				this.total = this.gradeInfo.total
			})
        }
    }
}
</script> 
<style scoped>
    .grade{
        padding: 10px;
    }
    .grade_button .el-input{
		width: 17%;
        margin-right: 20px;
	}
	.el-input{
		width: 100%;
	}
    .grade_button .el-button:nth-child(3){
        float: right;
        background-color:#2CB5AC
    }
    .grade_button .el-button:nth-child(3):hover{
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
    .el-table tr:hover{
        background-color: #eaf8f7;
    }
</style>