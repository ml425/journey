<template>
	<div class='product'>
		<div class="product_title">产品管理</div>
		<div class="product_buttom">
            <el-button type="primary" size="small" @click="toAdd">新增</el-button>
            <el-button type="primary" size="small" @click="deleteAll">批量删除</el-button>
			<el-input placeholder="请输入产品名称" v-model="input" clearable size="small"></el-input>
			<el-button type="primary" size="small" @click="toQuery">查询</el-button>
        </div>
		<!-- 显示数据的表格开始 -->
        <div class="product_table">
            <!-- {{multipleSelection}} -->
            <el-table
            :data="ProductData.list"  empty-text='暂无数据' size='small'
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
                prop="name"
                label="产品名称"
                width="180" align="center">
            </el-table-column>
            <el-table-column
                prop="price"
                label="价格"
                width="70" align="center">
            </el-table-column>
            <el-table-column
                prop="description"
                label="产品描述"
                min-width="100" align="center" show-overflow-tooltip>
            </el-table-column>
			<el-table-column
                prop="categoryId"
                label="所属栏目"
                width="80" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="{row}">
					<el-button type="text" size="small" @click="editProduct(row)">修改</el-button>
					<el-button type="text" size="small" @click="toDelete(row)">删除</el-button>
					<el-button type="text" size="small" @click="toDetails(row)">详情</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
        <!-- 显示数据的表格结束 -->
		<!-- 分页开始 -->
		<div class="product_page">
			<el-pagination background layout="total,prev, pager, next" :total="total"  :page-size="pageSize" @current-change="pageChangeHandler">
            </el-pagination>
		</div>
		<!-- 分页结束 -->
		<!-- 模态框开始 -->
        <el-dialog :title='title' :visible.sync="dialogVisible" width="50%">
            <!-- {{form}} -->
            <!-- 表单开始 -->
			<el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
			<el-form-item label="产品名称" prop="name">
				<el-input v-model="form.name" placeholder="请输入产品名称" size='small'></el-input>
			</el-form-item>
			<el-form-item label="价格" prop="price">
				<el-input v-model.number="form.price" placeholder="请输入此产品的价格" size='small'></el-input>
			</el-form-item>
			<el-form-item label="所属栏目" prop="categoryId">
				<el-select v-model="form.categoryId" placeholder="请选择父栏目" size='small'>
                	<el-option v-for="item in categoryParent" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
			</el-form-item>
			<el-form-item label="介绍" prop="textarea">
				<el-input type="textarea" v-model="form.description" placeholder="请填写对此产品的介绍" size='small'></el-input>
			</el-form-item>
            </el-form>
            <!-- 表单结束 -->
			<!-- 上传图片开始 -->
			<el-upload
				class="upload-demo"
				action="https://jsonplaceholder.typicode.com/posts/"
				:on-change="handleChange"
				:file-list="fileList">
				<el-button size="small" type="primary">点击上传</el-button>
				<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
			<!-- 上传图片结束 -->
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
				name:'',
				dialogVisible:false,
				title:'添加顾客',
				form:{
					name:'',
					price:'',
					categoryId:'',
					description:''
				},
				multipleSelection:[],
				rules: {
					name: [
						{ required: true, message: '请输入产品名称', trigger: 'blur' },
					],
					price: [
						{ required: true, message: '请输入价格'},
						{ type: 'number', message: '价格必须为数字值'}
					],
					categoryId: [
						{ required: true, message: '请选择所属栏目', trigger: 'change' }
					],
					textarea: [
						{ required: true, message: '请填写介绍', trigger: 'blur' }
					]
				},
				fileList:[]
			}
		},
		created(){
		  this.loadProduct()
		  this.loadParent()
		},
		computed:{
          ...mapState('product',['ProductData','categoryParent'])
      	},
		methods:{
			...mapActions('product',['toLoadProduct','saveProduct','deleteProduct','toDeleteAll','LoadCategoryParent']),
			// 上传文件
			handleChange(file, fileList) {
				this.fileList = fileList.slice(-3);
			},
			// 点击详情
			toDetails(row){
				// 路由跳转
				this.$router.push({name:'productDetails',query:{id:row.id}})
			},
			// 改变多选框时触发
			handleSelectionChange(val) {
				// multipleSelection是由选中的对象的id组成的数组
				this.multipleSelection = val.map((item,index)=>{
					return item.id;
				});
			},
			//批量删除
			deleteAll(){
				let ids = this.multipleSelection
				if(ids != ''){
					this.$confirm('此操作将永久删除该产品, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
						}).then(() => {
							this.toDeleteAll({ids}).then(r=>{
								this.loadProduct()
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
						message: '请选择要删除的产品'
					});
				}
			},
			// // 删除
			toDelete(row){
				this.$confirm('此操作将永久删除该产品, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
					}).then(() => {
						this.deleteProduct(row.id).then(r=>{
							this.loadProduct()
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
			// 加载所有栏目信息
			loadParent(){
				this.LoadCategoryParent()
			},
			//   保存顾客信息
			toSave(){
				this.dialogVisible = false
				// console.log(this.form);
				this.saveProduct(this.form).then(r=>{
					this.loadProduct()
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
			editProduct(row){
				this.dialogVisible = true,
				this.title = '修改顾客信息',
				this.form.name = row.name
				this.form.price = row.price
				this.form.categoryId = row.categoryId
				this.form.description = row.description?row.description:''
				this.form.id = row.id
			},
			// // 新增
			toAdd(){
				this.dialogVisible = true
				this.form={
					name:'',
					price:'',
					categoryId:'',
					description:''
				}
			},
			// 查询
			toQuery(){
				this.page = 0
				let obj = {
					page:this.page,
					pageSize:this.pageSize,
					name:this.input
				}
				if(obj.name == ''){
					delete obj.name
				}
				this.toLoadProduct(obj).then(res=>{
					this.total = this.ProductData.total
				})
			},
			// 加载顾客
			loadProduct(){
				let obj = {
					page:this.page,
					pageSize:this.pageSize,
					name:this.input
				}
				if(obj.name == ''){
					delete obj.name
				}
				this.toLoadProduct(obj).then(res=>{
					this.total = this.ProductData.total
				})
			},
			//  页码改变的事件处理函数
			pageChangeHandler(page){
				this.page = page-1;
				this.loadProduct()
				// this.toQuery()
			},
		}
	}
</script>
<style scoped>
    .product{
        background-color: #fff;
        min-height: calc(100vh - 50px);
        margin: 10px;
        padding: 10px;
    }
    .product_title{
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
    }
    .product_buttom{
        margin-top: 10px;
    }
    .product_table{
        width: 102%;
        /* height: 500px; */
        overflow-y: auto;
		margin-bottom: 10px;
    }
	.product_buttom .el-input{
		width: 20%;
	}
	.upload-demo{
		margin-left: 100px;
	}
	.el-input{
		width: 100%;
	}
	/* 模态框上面的下拉框 */
	.el-dialog .el-select{
		width: 100%;
	}
</style>