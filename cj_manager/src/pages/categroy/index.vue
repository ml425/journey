<template>
	<div class="category">
		<div class="category_title">栏目管理</div>
		<div class="category_button">
			<el-button type="primary" size='small' @click="toAdd">新增</el-button>
			<el-button type="primary" size="small" @click="deleteAll">批量删除</el-button>
			<el-input placeholder="请输入栏目名称" v-model="input" clearable size="small"></el-input>
			<el-button type="primary" size="small" @click="toQuery">查询</el-button>
		</div>
		<div class="category_table">
			 <el-table
		      :data="category.list"
		      style="width: 100%"
		      size='small' @selection-change="handleSelectionChange" empty-text='暂无数据'>
			  <el-table-column
                type="selection"
                width="55">
            </el-table-column>
		      <el-table-column
		        prop="id"
		        label="编号"
		        align="center"
		        width="50">
		      </el-table-column>
		      <el-table-column
		        prop="name"
		        label="栏目名称"
		        align="center"
		       >
		      </el-table-column>
		      <el-table-column
		        prop="num"
		        align="center"
		        label="序号">
		      </el-table-column>
		      <el-table-column
		        prop="parentId"
		        label="父栏目"
		        align="center"
		        width="200">
		      </el-table-column>
		      <el-table-column
		        align="center"
		        label="操作">
		        <template slot-scope="{row}">
		        	<span class="setSpan" @click="toDelete(row)">删除</span>
		        	<span class="setSpan" @click="editWaiter(row)">编辑</span>
		        </template>
		      </el-table-column>
		    </el-table>
		</div>
		<!-- 分页开始 -->
		<div class="category_page">
			<el-pagination background @current-change="handleCurrentChange" :page-size="pagesize" :current-page="page" layout="total, prev, pager, next" :total="total"></el-pagination>
		</div>
		<!-- 分页结束 -->
		<!-- 模态框开始 -->
        <el-dialog :title='title' :visible.sync="dialogVisible" width="50%">
            <!-- {{form}} -->
            <!-- 表单开始 -->
			<el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
			<el-form-item label="栏目名称" prop="name">
				<el-input v-model="form.name" placeholder="请输入栏目名称" size='small'></el-input>
			</el-form-item>
			<el-form-item label="序号" prop="num">
				<el-input v-model.number="form.num" placeholder="请输入序号" size='small'></el-input>
			</el-form-item>
			<el-form-item label="所属栏目" prop="parentId">
				<el-select v-model="form.parentId" placeholder="请选择父栏目" size='small'>
                	<el-option v-for="item in categoryParent" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
			</el-form-item>
            </el-form>
            <!-- 表单结束 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size='small'>取 消</el-button>
                <el-button type="primary" @click="toSave" size='small'>确 定</el-button>
            </span>
        </el-dialog>
        <!-- 模态框结束 -->
	</div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
  export default {
    data() {
      return {
      	page:0,
      	total:100,
		pagesize:8,
		input:'',
		dialogVisible:false,
		title:'添加栏目',
		form:{
			name:'',
			num:'',
			parentId:''
		},
		multipleSelection:[],
		rules: {
			name: [
				{ required: true, message: '请输入栏目名称', trigger: 'blur' }
			],
			num: [
				{ required: true, message: '请输入序号'},
      			{ type: 'number', message: '序号应为数字'}
			],
			parentId: [
				{ required: true, message: '请选择父栏目'}
			]
		}
      }
    },
    created(){
		this.load()
		this.loadParent()
    },
    computed:{
    	...mapState('category',['category','categoryParent','message'])
	},
    methods:{
		...mapActions('category',['toLoadcategory','saveCategory','deleteCategory','LoadCategoryParent','toDeleteAll']),
		// 改变多选框时触发
		handleSelectionChange(val) {
			// multipleSelection是由选中的对象的id组成的数组
			this.multipleSelection = val.map((item,index)=>{
				return item.id;
			});
		},
		// 批量删除
		deleteAll(){
			let ids = this.multipleSelection
			if(ids != ''){
				this.$confirm('此操作将永久删除该栏目, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
					}).then(() => {
						this.toDeleteAll({ids}).then((response)=>{
							if(this.message.status == 200){
								this.load()
								this.$notify({
									title: '成功',
									message:this.message.message,
									type:'success'
								})
							}else{
								this.$notify.error({
									title: '错误',
									message: this.message.message
								});
							}
						})
					}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});          
				});
			}else{
				this.$message({
					type: 'info',
					message: '请选择要删除的栏目'
				}); 
			}
		},
		// 删除
		toDelete(row){
			this.$confirm('此操作将永久删除该栏目, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
				}).then(() => {
					this.deleteCategory(row.id).then(r=>{
						if(this.message.status == 200){
							this.load()
							this.$notify({
								title: '成功',
								message:this.message.message,
								type:'success'
							})
						}else{
							this.$notify.error({
								title: '错误',
								message: this.message.message
							});
						}
					})
				}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});
		},
		// 保存员工信息
		toSave(){
			this.dialogVisible = false
			// console.log(this.form);
			this.saveCategory(this.form).then(r=>{
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
		// 修改
		editWaiter(row){
			this.dialogVisible = true,
			this.title = '修改栏目信息',
			// this.form = row
			this.form.name = row.name?row.name:''
			this.form.num = row.num?row.num:''
			this.form.parentId = row.parentId?row.parentId:''
			this.form.id = row.id
		},
		// 新增
		toAdd(){
			this.dialogVisible = true
			this.form={
				name:'',
				num:'',
				parentId:''
			}
		},
		// 查询
		toQuery(){
			this.page = 0
			let obj = {
				page:this.page,
				pageSize:this.pagesize,
				name:this.input
			}
			if(obj.name == ''){
				delete obj.name
			}
			console.log(obj);
			this.toLoadcategory(obj).then(res=>{
				this.total = this.category.total
			})
		},
		// 加载所有栏目信息
		loadParent(){
			this.LoadCategoryParent()
		},
    	// 分页加载栏目信息
    	load(){
    		let obj = {
    			page:this.page,
				pageSize:this.pagesize,
				name:this.input
			}
			if(obj.name == ''){
				delete obj.name
			}
			this.toLoadcategory(obj).then(r=>{
				this.total = this.category.total
			})
    	},
    	// 分页触发事件
    	handleCurrentChange(page){
    		this.page = page - 1
    		// this.toQuery()
    		this.load()
    	}
    	
    }
  }
</script>
<style scoped>
	.category{
		width: 99%;
		min-height: calc(100vh - 70px);
		background-color: #fff;
		padding: 10px;
		overflow: hidden;
	}
	.category_title{
		border-bottom: 1px solid #ccc;
		padding-bottom: 10px;
	}
	.category_button{
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.category_table{
		max-height: 450px;
		overflow: auto;
		width: 102%;
		margin-bottom: 10px;
	}
	
	.category i{
		font-size: 16px;
		cursor: pointer;
	}
	.setSpan{
		color: #4DAAFF;
		cursor: pointer;
	}
	.category_button .el-input{
		width: 20%;
	}
	.el-input{
		width: 100%;
	}
	/* 模态框上面的下拉框 */
	.el-dialog .el-select{
		width: 100%;
	}
</style>