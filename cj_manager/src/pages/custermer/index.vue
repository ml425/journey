<template>
	<div class='customer'>
		<div class="customer_title">顾客管理</div>
		<div class="customer_buttom">
            <el-button type="primary" size="small" @click="toAdd">新增</el-button>
            <el-button type="primary" size="small" @click="deleteAll">批量删除</el-button>
			<el-input placeholder="请输入状态" v-model="input" clearable size="small"></el-input>
			<el-button type="primary" size="small" @click="toQuery">查询</el-button>
        </div>
		<!-- 显示数据的表格开始 -->
        <div class="customer_table">
            <!-- {{multipleSelection}} -->
            <el-table
            :data="CustomerData.list" size='small'  empty-text='暂无数据'
            style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                prop="id"
                label="编号"
                width="60" align="center">
            </el-table-column>
            <el-table-column
                prop="username"
                label="姓名"
                width="180" align="center">
            </el-table-column>
            <el-table-column
                prop="telephone"
                label="手机号"
                width="150" align="center">
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态"
                min-width="100" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="{row}">
					<el-button type="text" size="small" @click="editCustomer(row)">修改</el-button>
					<el-button type="text" size="small" @click="toDelete(row)">删除</el-button>
					<el-button type="text" size="small" @click="toDetails(row)">详情</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
        <!-- 显示数据的表格结束 -->
		<!-- 分页开始 -->
		<div class="customer_page">
			<el-pagination background layout="total,prev, pager, next" :total="total"  :page-size="pageSize" @current-change="pageChangeHandler">
            </el-pagination>
		</div>
		<!-- 分页结束 -->
		<!-- 模态框开始 -->
        <el-dialog :title='title' :visible.sync="dialogVisible" width="50%">
            <!-- {{form}} -->
            <!-- 表单开始 -->
			<el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="form.username" placeholder="请输入用户名" size='small'></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="realname">
				<el-input v-model="form.realname" placeholder="请输入姓名" size='small'></el-input>
			</el-form-item>
			<el-form-item label="手机号" prop="telephone">
				<el-input v-model="form.telephone" placeholder="请输入手机号" size='small'></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" v-model="form.password" placeholder="请输入密码" size='small'></el-input>
			</el-form-item>
			<el-form-item label="状态" prop="status">
				<el-select v-model="form.status" placeholder="请选择状态" size='small'>
					<el-option label="禁用" value="禁用"></el-option>
					<el-option label="启用" value="启用"></el-option>
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
	export default{
		data(){
			return {
				page:0,
				pageSize:5,
				total:100,
				input:'',
				dialogVisible:false,
				title:'添加顾客信息',
				form:{
					username:'',
					realname:'',
					telephone:'',
					password:'',
					status:''
				},
				multipleSelection:[],
				rules: {
					username: [
						{ required: true, message: '请输入用户名', trigger: 'blur' },
					],
					realname: [
						{ required: true, message: '请输入姓名', trigger: 'blur' },
					],
					telephone: [
						{ required: true, message: '请输入手机号'},
						{ min:11, max:11, message: '手机号应为11位'},
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'change' }
					],
					status: [
						{ required: true, message: '请选择状态', trigger: 'blur' }
					],
				}
			}
		},
		// watch: {
		// 	page: {
		// 		handler: function (now) {
		// 			this.toQuery();
		// 		},
		// 		deep: true
		// 	},
		// 	input:function(now){
		// 		this.status = now;
		// 	}
		// },
		created(){
          this.loadCustomer()
		},
		computed:{
          ...mapState('customer',['CustomerData'])
      	},
		methods:{
			...mapActions('customer',['toLoadCustomer','saveCustomer','deleteCustomer','toDeleteAll']),
			// 点击详情
			toDetails(row){
				// 路由跳转
				this.$router.push({name:'customerDetails',query:{id:row.id}})
			},
			// 改变多选框时触发
			handleSelectionChange(val) {
				// multipleSelection是由选中的对象的id组成的数组
				this.multipleSelection = val.map((item,index)=>{
					return item.id;
				});
			},
			// // 批量删除
			deleteAll(){
				let ids = this.multipleSelection
				if(ids != ''){
					this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
						}).then(() => {
							this.toDeleteAll({ids}).then(r=>{
								this.loadCustomer()
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
				}else{
					this.$message({
						type: 'info',
						message: '请选择要删除的栏目'
					});
				}
			},
			// // 删除
			toDelete(row){
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
					}).then(() => {
						this.deleteCustomer(row.id).then(r=>{
							this.loadCustomer()
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
			//   保存顾客信息
			toSave(){
				this.dialogVisible = false
				// console.log(this.form);
				this.saveCustomer(this.form).then(r=>{
					this.loadCustomer()
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
			// // 修改
			editCustomer(row){
				this.dialogVisible = true,
				this.title = '修改顾客信息',
				this.form.username = row.username
				this.form.realname = row.realname
				this.form.status = row.status
				this.form.telephone = row.telephone?row.telephone:''
				this.form.password = row.password?row.password:''
				this.form.id = row.id
			},
			// // 新增
			toAdd(){
				this.dialogVisible = true
				this.form={
					username:'',
					realname:'',
					telephone:'',
					password:'',
					status:''
				}
			},
			// 查询
			toQuery(){
				this.page = 0
				let obj = {
					page:this.page,
					pageSize:this.pageSize,
					status:this.input
				}
				if(obj.status == ''){
					delete obj.status
				}
				this.toLoadCustomer(obj).then(res=>{
					this.total = this.CustomerData.total
				})
			},
			// 加载顾客
			loadCustomer(){
				let obj = {
					page:this.page,
					pageSize:this.pageSize,
					// status:this.input
				}
				this.toLoadCustomer(obj).then(res=>{
					this.total = this.CustomerData.total
				})
			},
			//  页码改变的事件处理函数
			pageChangeHandler(page){
				this.page = page-1;
				this.loadCustomer()
			},
		}
	}
</script>
<style scoped>
    .customer{
        background-color: #fff;
        min-height: calc(100vh - 50px);
        margin: 10px;
        padding: 10px;
    }
    .customer_title{
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
    }
    .customer_buttom{
        margin-top: 10px;
    }
    .customer_table{
        width: 102%;
        /* height: 500px; */
        overflow-y: auto;
		margin-bottom: 10px;
    }
	.customer_buttom .el-input{
		width: 20%;
	}
	.el-input[data-v-714056de]{
		width: 100%;
	}
	/* 模态框上面的下拉框 */
	.el-dialog .el-select{
		width: 100%;
	}
</style>