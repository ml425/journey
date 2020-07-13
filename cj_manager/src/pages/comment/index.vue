<template>
	<div class='comment'>
		<div class="comment_title">顾客管理</div>
		<!-- 显示数据的表格开始 -->
        <div class="comment_table">
            <!-- {{multipleSelection}} -->
            <el-table
            :data="CommentData.list"
            style="width: 100%" empty-text='暂无数据' size='small'>
            <el-table-column
                prop="id"
                label="编号"
                width="70" align="center">
            </el-table-column>
            <el-table-column
                prop="content"
                label="评论内容"
                min-width="180" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                label="评论时间"
                width="150" align="center">
				<template slot-scope="{row}">
					<span>{{row.commentTime | dateParse}}</span>
				</template>
            </el-table-column>
			<el-table-column
                prop="orderId"
                label="产品ID"
                width="150" align="center">
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态"
                width="100" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="{row}">
					<el-button type="text" @click="toDelete(row)">删除</el-button>
					<el-button type="text" v-if="row.status=='审核不通过'" @click="promise(row)">通过审核</el-button>
					<el-button type="text" v-if="row.status=='审核通过'" @click="refuse(row)">拒绝审核</el-button>
					<el-button type="text" v-if="row.status=='未审核'" @click="promise(row)">审核</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
        <!-- 显示数据的表格结束 -->
		<!-- 分页开始 -->
		<div class="comment_page">
			<el-pagination background layout="total,prev, pager, next" :total="total"  :page-size="pageSize" @current-change="pageChangeHandler">
            </el-pagination>
		</div>
		<!-- 分页结束 -->
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
				// status:''
			}
		},
		created(){
          this.loadComment()
		},
		computed:{
          ...mapState('comment',['CommentData'])
      	},
		methods:{
			...mapActions('comment',['toLoadComment','deleteComment','promiseComment','refuseComment']),
			// 拒绝审核
			refuse(row){
				this.refuseComment(row.id).then(r=>{
					this.loadComment()
				})
			},
			// 通过审核
			promise(row){
				this.promiseComment(row.id).then(r=>{
					this.loadComment()
				})
			},
			// // 删除
			toDelete(row){
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
					}).then(() => {
						this.deleteComment(row.id).then(r=>{
							this.loadComment()
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
			// 加载顾客
			loadComment(){
				let obj = {
					page:this.page,
					pageSize:this.pageSize,
				}
				this.toLoadComment(obj).then(res=>{
					this.total = this.CommentData.total
				})
			},
			//  页码改变的事件处理函数
			pageChangeHandler(page){
				this.page = page-1;
				this.loadComment()
			},
		}
	}
</script>
<style scoped>
    .comment{
        background-color: #fff;
        min-height: calc(100vh - 50px);
        margin: 10px;
        padding: 10px;
    }
    .comment_title{
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
    }
    .comment_table{
        width: 102%;
        /* height: 500px; */
        overflow-y: auto;
		margin-bottom: 10px;
    }
	.comment_buttom .el-input{
		width: 20%;
	}
	.el-input[data-v-714056de]{
		width: 100%;
	}
</style>