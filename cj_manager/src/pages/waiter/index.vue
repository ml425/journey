<template>
	<div class="waiter">
		<div class="waiter_title">员工管理</div>
		<div class="waiter_button">
			<el-button type="primary" size='small' @click="toAdd">新增</el-button>
		</div>
		<div class="waiter_table">
			 <el-table
		      :data="waiter.list"
		      style="width: 100%"
		      size='small' empty-text='暂无数据'>
		      <el-table-column
		        prop="id"
		        label="编号"
		        align="center"
		        width="50">
		      </el-table-column>
		      <el-table-column
		        prop="realname"
		        label="姓名"
		        align="center"
		       >
		      </el-table-column>
		      <el-table-column
		        prop="telephone"
		        align="center"
		        label="手机号">
		      </el-table-column>
		      <el-table-column
		        prop="idCard"
		        label="身份证号"
		        align="center"
		        width="200">
		      </el-table-column>
		      <el-table-column
		        prop="bankCard"
		        label="银行卡号"
		        align="center"
		        width="150">
		      </el-table-column>
		      <el-table-column
		        label="注册时间"
		        align="center"
		        width="180">
		        <template slot-scope='{row}'>
		        	{{row.registerTime | dateParse}}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="status"
		        align="center"
		        label="状态">
		      </el-table-column>
		      <el-table-column
		        align="center"
		        label="操作">
		        <template slot-scope="{row}">
		        	<span class="setSpan" @click="toDelete(row)">删除</span>
		        	<span class="setSpan" @click="editWaiter(row)">编辑</span>
		        	<span class="setSpan" @click="toDetails(row)">详情</span>
		        </template>
		      </el-table-column>
		    </el-table>
		</div>
		<!-- 分页开始 -->
		<div class="waiter_page">
			<el-pagination background @current-change="handleCurrentChange" :page-size="pagesize" layout="total, prev, pager, next" :total="total"></el-pagination>
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
			<el-form-item label="身份证号" prop="idCard">
				<el-input  v-model="form.idCard" placeholder="请输入身份证号" size='small'></el-input>
			</el-form-item>
			<el-form-item label="银行卡号" prop="bankCard">
				<el-input  v-model="form.bankCard" placeholder="请输入银行卡号" size='small'></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" v-model="form.password" placeholder="请输入密码" size='small'></el-input>
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
      	input:'',
      	page:0,
      	total:100,
		pagesize:8,
		dialogVisible:false,
		title:'添加员工信息',
		form:{
			username:'',
			realname:'',
			telephone:'',
			idCard:'',
			bankCard:'',
			password:''
		},
		multipleSelection:[],
		rules: {
			username: [
				{ required: true, message: '请输入用户名', trigger: 'blur' },
			],
			realname: [
				{required: true, message:'请输入姓名', trigger:'blur'}
			],
			telephone: [
				{ required: true, message: '请输入手机号'},
				{ min:11, max:11, message: '手机号应为11位'}
			],
			idCard: [
				{ required: true, message: '请输入身份证号'}
			],
			bankCard: [
				{ required: true, message: '请输入银行卡号'}
			],
			password: [
				{ required: true, message: '请输入密码'}
			]
		}
      }
    },
    created(){
    	this.load()
    },
    computed:{
    	...mapState('waiter',['waiter'])
    },
    methods:{
		...mapActions('waiter',['toLoadwaiter','saveWaiter','deleteWaiter']),
		// 点击详情
		toDetails(row){
			// 路由跳转
			this.$router.push({name:'waiterDetails',query:{id:row.id}})
		},
		// 删除
		toDelete(row){
			this.$confirm('此操作将永久删除该员工信息, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
				}).then(() => {
					this.deleteWaiter(row.id).then(r=>{
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
		// 保存员工信息
		toSave(){
			this.dialogVisible = false
			// console.log(this.form);
			this.saveWaiter(this.form).then(r=>{
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
			this.title = '修改顾客信息',
			this.form = row
			// this.form.username = row.username?row.username:''
			// this.form.realname = row.realname?row.realname:''
			// this.form.telephone = row.telephone?row.telephone:''
			// this.form.idCard = row.idCard?row.idCard:''
			// this.form.bankCard = row.bankCard?row.bankCard:''
			// this.form.password = row.password?row.password:''
			// this.form.id = row.id
		},
		// 新增
		toAdd(){
			this.dialogVisible = true
			this.form={
				username:'',
				realname:'',
				telephone:'',
				idCard:'',
				bankCard:'',
				password:''
			}
		},
    	// 加载顾客
    	load(){
    		let obj = {
    			page:this.page,
    			pageSize:this.pagesize
    		}
			this.toLoadwaiter(obj).then(r=>{
				this.total = this.waiter.total
			})
    	},
    	// 分页触发事件
    	handleCurrentChange(val){
    		this.page = val - 1
    		this.load()
    	}
    	
    }
  }
</script>
<style scoped>
	.waiter{
		width: 99%;
		min-height: calc(100vh - 70px);
		background-color: #fff;
		padding: 10px;
		overflow: hidden;
	}
	.waiter_title{
		border-bottom: 1px solid #ccc;
		padding-bottom: 10px;
	}
	.waiter_button{
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.waiter_table{
		max-height: 450px;
		overflow: auto;
		width: 102%;
		margin-bottom: 10px;
	}
	
	.waiter i{
		font-size: 16px;
		cursor: pointer;
	}
	.setSpan{
		color: #4DAAFF;
		cursor: pointer;
	}
	.waiter_button .el-input{
		width: 200px !important;
	}
</style>