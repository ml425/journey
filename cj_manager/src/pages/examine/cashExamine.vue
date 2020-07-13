<template>
	<div class="cashExamine">
		<div class="cashExamine_table">
			 <el-table
		      :data="waiterShou.list"
		      style="width: 100%"
		      size='small' empty-text='暂无数据'>
		      <el-table-column
		        prop="id"
		        label="编号"
		        align="center"
		        width="50">
		      </el-table-column>
		      <el-table-column
		        prop="money"
		        label="金额"
		        align="center"
		       >
		      </el-table-column>
		      <el-table-column
		        prop="type"
		        align="center"
		        label="类型">
		      </el-table-column>
		      <el-table-column
		        prop="description"
		        label="描述"
		        align="center"
		        width="200" show-overflow-tooltip>
		      </el-table-column>
		      <el-table-column
		        prop="userId"
		        label="员工ID"
		        align="center"
		        width="150">
		      </el-table-column>
		      <!-- <el-table-column
		        label="凭证"
		        align="center"
		        width="180">
		        <template slot-scope='{row}'>
		        	{{row.registerTime | dateParse}}
		        </template>
		      </el-table-column> -->
			  <el-table-column
		        align="center"
		        label="凭证">
		        <template slot-scope="{row}">
		        	<span class="setSpan" @click="look(row)">查看凭证</span>
		        </template>
		      </el-table-column>
		      <el-table-column
		        align="center"
		        label="操作">
		        <template slot-scope="{row}">
		        	<span v-if="row.status == '1'" class="setSpan">已审核</span>
		        	<span v-else class="setSpan" @click="Audit(row)">审核</span>
		        </template>
		      </el-table-column>
		    </el-table>
		</div>
		<!-- 分页开始 -->
		<div class="cashExamine_page">
			<el-pagination background @current-change="handleCurrentChange" :page-size="pagesize" layout="total, prev, pager, next" :total="total"></el-pagination>
		</div>
		<!-- 分页结束 -->
		<!-- 弹出框开始 -->
		<el-dialog
			title="凭证"
			:visible.sync="dialogVisible"
			width="50%">
			<span>
				<img :src="this.img" alt="">
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
		img:''
      }
    },
    created(){
    	this.loadCE()
    },
    computed:{
    	...mapState('cashExamine',['waiterShou'])
    },
    methods:{
		...mapActions('cashExamine',['toLoadCE','toAudit']),
		// 审核
		Audit(row){
			this.toAudit(JSON.stringify(row)).then(res=>{
				this.loadCE()
				this.$message({
					message: '审核成功',
					type: 'success'
				});
			})
		},
		// 查看凭证
		look(){
			this.dialogVisible = true
			// this.img = this.waiterShou.list.transferAccounts
		},
    	// 加载提现审核
    	loadCE(){
    		let obj = {
    			page:this.page,
    			pageSize:this.pagesize
    		}
			this.toLoadCE(obj).then(r=>{
				this.total = this.waiterShou.total
			})
    	},
    	// 分页触发事件
    	handleCurrentChange(val){
    		this.page = val - 1
    		this.loadCE()
    	}
    	
    }
  }
</script>
<style scoped>
	.cashExamine{
		width: 99%;
		min-height: calc(100vh - 70px);
		background-color: #fff;
		padding: 10px;
		overflow: hidden;
	}
	.cashExamine_title{
		border-bottom: 1px solid #ccc;
		padding-bottom: 10px;
	}
	.cashExamine_table{
		max-height: 450px;
		overflow: auto;
		width: 102%;
		margin-bottom: 10px;
	}
	.cashExamine i{
		font-size: 16px;
		cursor: pointer;
	}
	.setSpan{
		color: #4DAAFF;
		cursor: pointer;
	}
	/* .el-dialog__body>span{
		height: 200px;
		width: 100%;
		display: inline-block;
	} */
</style>