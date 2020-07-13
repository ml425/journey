<template>
	<div class="waiterExamine">
		<div class="waiterExamine_table">
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
		        	<span class="setSpan" @click="audit(row)">审核</span>
		        </template>
		      </el-table-column>
		    </el-table>
		</div>
		<!-- 分页开始 -->
		<div class="waiterExamine_page">
			<el-pagination background @current-change="handleCurrentChange" :page-size="pagesize" layout="total, prev, pager, next" :total="total"></el-pagination>
		</div>
		<!-- 分页结束 -->
		<!-- 弹出框开始 -->
		<el-dialog
			title="审核员工"
			:visible.sync="dialogVisible"
			width="50%">
			<span>
				<div class="dialog_left">
					<div>用户名：</div>
					<div>身份证正面照</div>
					<img src="" alt="">
				</div>
				<div class="dialog_right">
					<div>身份证号：</div>
					<div>身份证反面照</div>
					<img src="" alt="">
				</div>
			</span>
			<span slot="footer" class="dialog-footer">
					<el-form ref="form" :model="form" label-width="80px">
						<el-form-item>
							<el-button type="primary" @click="passAudit(form.id)" size='small'>审核通过</el-button>
							<el-button type="danger" @click="refuseAudit(form.id)" size='small'>拒绝审核</el-button>
						</el-form-item>
					</el-form>
			</span>
		</el-dialog>
		<!-- 弹出框结束 -->
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
		dialogVisible: false,
		form:{
			id:''
		},
		img1:'',
		img2:''
      }
    },
    created(){
    	this.loadWE()
    },
    computed:{
    	...mapState('waiterExamine',['waiter'])
    },
    methods:{
		...mapActions('waiterExamine',['toLoadwaiter','topassAudit','torefuseAudit']),
		// 拒绝审核
		refuseAudit(id){
			this.dialogVisible = false
			// console.log(id);
			this.torefuseAudit(id).then(r=>{
				this.loadWE()
				this.$message({
					message: '拒绝成功',
					type: 'success'
				});
			})
		},
		// 审核通过
		passAudit(id){
			this.dialogVisible = false
			let obj = {
				id:id,
				img1:'../../assets/timg.jpg',
				img2:'../../assets/timg.jpg'
			}
			// console.log(id);
			this.topassAudit(obj).then(r=>{
				this.$message({
					message: '审核成功',
					type: 'success'
				});
				this.loadWE()
			})
		},
		// 审核
		audit(row){
			this.dialogVisible = true
			this.form.id = row.id
			console.log(this.form.id);
		},
    	// 加载顾客
    	loadWE(){
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
    		this.loadWE()
    	}
    	
    }
  }
</script>
<style scoped>
	.waiterExamine{
		width: 99%;
		min-height: calc(100vh - 70px);
		background-color: #fff;
		padding: 10px;
		overflow: hidden;
	}
	.waiterExamine_title{
		border-bottom: 1px solid #ccc;
		padding-bottom: 10px;
	}
	.waiterExamine_table{
		max-height: 450px;
		overflow: auto;
		width: 102%;
		margin-bottom: 10px;
	}
	.waiterExamine i{
		font-size: 16px;
		cursor: pointer;
	}
	.setSpan{
		color: #4DAAFF;
		cursor: pointer;
	}
	.el-dialog__body>span{
		/* overflow: hidden; */
		height: 200px;
		width: 100%;
		display: inline-block;
	}
	.el-dialog__body>span>div div{
		margin: 20px 0;
	}
	.dialog_left{
		float: left;
	}
	.dialog_right{
		float: right;
	}
	.dialog_left img,.dialog_right img{
		width: 250px;
		height: 120px;
		border: 1px solid #000;
	}
</style>