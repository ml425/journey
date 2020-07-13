<template>
    <div class="information">
        <div class="information_left">
            <!-- 表格开始 -->
            <el-table
                :data="courseInfo.list" 
                style="width: 100%" @row-click="openInformations" size='small' empty-text='暂无数据'>
                <el-table-column
                    prop="id"
                    label="序号"
                    width="70" align="center">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="名称"
                    width="240" align="center" show-overflow-tooltip>
                </el-table-column>
            </el-table>
            <!-- 表格结束 -->
            <!-- 分页开始 -->
            <div class="information_page">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :page-size="pagesize"
                    layout="total, prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>
            <!-- 分页结束 -->
        </div>
        <div class="information_right" v-if="isShow">
            <!-- 右边具体资料的头部 -->
            <div class="right_header">
                <div><span>当前课程：</span> <span>{{this.courseNameNow}}</span></div>
                <el-button type="success" size="small" @click="toAdd">增加资料</el-button>
            </div>
            <!-- 表格开始 -->
            <el-table
                :data="informationInfo"
                style="width: 100%" border size='small' empty-text='暂无数据'>
                <el-table-column
                    prop="id"
                    label="序号"
                    width="50" align="center">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="名称"
                    width="220" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="上传时间"
                    width="170" align="center">
                    <template slot-scope="{row}">
                        <span>{{row.createTime | dateParse}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="类型"
                    width="100" align="center">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="100" align="center">
                    <template slot-scope="scope">
                        <el-button @click="deleteRow(scope.row)" type="text" size="small">删除</el-button>
                        <el-button  type="text" size="small" @click="download(scope.row)">下载</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 表格结束 -->
        </div>
        <div class="replace" v-else>您还未选中课程</div>
        <!-- 模态框开始 -->
        <el-dialog title='增加资料' :visible.sync="dialogVisible" width="50%">
            <!-- {{form}} -->
            <!-- 表单开始 -->
			<el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
                <el-form-item label="资料名称" prop="name" >
                    <el-input v-model="form.name" placeholder="资料名称" size='small'></el-input>
                </el-form-item>
                <el-form-item label="资料类型" prop="type">
                    <el-select v-model="form.type" placeholder="请选择资料类型" size='small'>
                        <el-option v-for="item in informations" :key="item.id" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-upload
                    class="upload-demo"
                    action="http://10.0.7.57:8002/swagger-ui.html#!/file-controller/uploadUsingPOST"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    multiple
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                    <el-button size="small" type="success">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">文件大小不允许超过3M</div>
                </el-upload>
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
            pagesize:8,
            isShow:false,
            courseNameNow:'',
            courseIdNow:'',
            informations:['图片','视频','笔记'],
            dialogVisible:false,
            form:{},
            rules: {
                name: [
                    { required: true, message: '请输入资料名称', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择'}
                ]
            },
            fileList:[{name:'',url:''}]
        }
    },
    created(){
        this.load()
    },
    computed:{
        ...mapState('coursePublish',['courseInfo']),
        ...mapState('information',['informationInfo']),
    },
    methods:{
        ...mapActions('coursePublish',['loadCourse']),
        ...mapActions('information',['loadInformation','saveInformation','deleteInformation','downloadformation']),
        // 下载
        download(row){
            console.log(row);
            this.downloadformation(row.url).then(r=>{
                // this.$router.push({path:'row.url'})
                // this.$router.push({path:'https://blog.csdn.net/weixin_41804429/article/details/88320461'})
                // this.$router.push('row.url')
                this.$router.push('https://blog.csdn.net/weixin_41804429/article/details/88320461')
            })
        },
        // 删除
        deleteRow(row) {
            // console.log(row);
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
				}).then(() => {
					this.deleteInformation(row.id).then(r=>{
				    this.loadInformation(this.courseIdNow)
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
        // 上传的组件的一些方法
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            console.log(fileList);
            console.log(this.fileList);
        },
        // 保存新增的资料
		toSave(){
            this.dialogVisible = false
            // this.form.url = this.fileList[0].url
			// console.log(this.fileList);
			// console.log(this.fileList[0].url);
			// console.log(this.form);
			this.saveInformation(this.form).then(r=>{
				this.loadInformation(this.courseIdNow)
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
			this.fileList = []
			this.form={
				name:'',
                type:'',
                url:'',
                courseId:this.courseIdNow,
                createTime:Date.parse(new Date())
            }
		},
        // 点击某一行
        openInformations(row){
            // 根据课程id加载资料
            this.loadInformation(row.id)
            this.courseNameNow = row.name
            this.courseIdNow = row.id
            this.isShow = true
        },
        // 分页触发事件
    	handleCurrentChange(page){
    		this.page = page
    		this.load()
        },
        load(){
            // 加载所有课程信息
            let obj = {
                page:this.page,
                pageSize:this.pagesize
            }
            this.loadCourse(obj).then(r=>{
                this.total = this.courseInfo.total
            })
        }
    }
}
</script>
<style scoped>
    /* .information{
        padding: 10px;
    } */
    .information_left{
        width: 30%;
        float: left;
        margin-right: 20px;
    }
    .information_right{
        width: 65%;
        padding: 10px;
        float: right;
    }
    .replace{
        color: red;
        font-size: 12px;
        padding: 10px;
    }
    /* 成功的按钮 */
    .el-button--success{
        background: #2cb5ac;
        border-color: #2cb5ac;
        margin: 10px 0 10px 0;
    }
    .el-button--success:hover{
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
    .right_header>div>span:first-child{
        font-weight: bold;
    }
    .el-dialog .el-select{
        width: 100%;
    }
</style>