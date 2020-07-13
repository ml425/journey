<template>
    <div class="courseCheck">
        <div class="courseCheck_button">
            <div>
                <el-select v-model="value1" placeholder="请选择年级" clearable size='small' >
                    <el-option v-for="item in grade" :key="item.id" :label="item" :value="item"></el-option>
                </el-select>
                <el-select v-if="isShow" v-model="value2" placeholder="请选择学科" clearable size='small'>
                    <el-option v-for="item in subject" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <el-input placeholder="请输入课程名称关键字" v-model="input" clearable size="small"></el-input>
                <el-button type="text" size="small" @click="search">搜索</el-button>
            </div>
		</div>
        <!-- 表格开始 -->
        <el-table
            :data="courseInfo.list"
            style="width: 100%" size='small' empty-text='暂无数据'>
            <el-table-column
                prop="id"
                label="序号"
                width="50" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="name"
                label="名称"
                width="180" align="center">
            </el-table-column>
            <el-table-column
                prop="subject.name"
                label="学科"
                width="100" align="center">
            </el-table-column>
            <el-table-column
                label="提交时间"
                width="180" align="center">
                <template slot-scope="{row}">
					<span>{{row.createTime | dateParse}}</span>
				</template>
            </el-table-column>
            <el-table-column
                label="状态"
                width="180" align="center">
                <template slot-scope="{row}">
                    <div v-if="row.status=='未审核'" class="checkstatus statusPass">{{row.status}}</div>
                    <div v-else class="checkstatus statusNo">{{row.status}}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="opinion"
                label="审核意见" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100" align="center">
                <template slot-scope="{row}">
                    <el-button v-if="row.status=='未审核'" @click="auditRow(row)" type="text" size="small">审核</el-button>
                    <el-button v-else type="text" size="small" disabled style="color:#ccc">审核</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 表格结束 -->
        <!-- 分页开始 -->
		<div class="courseCheck_page">
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
        <el-dialog title='审核课程信息' :visible.sync="dialogVisible" width="50%">
            <!-- {{form}} -->
            <!-- 表单开始 -->
			<el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm">
                <el-form-item label="名称">
                    <el-input v-model="form.name" readonly size='small'></el-input>
                </el-form-item>
                <el-form-item label="介绍">
                    <el-input v-model="form.introduce" readonly size='small'></el-input>
                </el-form-item>
                <el-form-item label="审核">
                    <el-radio-group v-model="form.status" size='small'>
                        <el-radio label="通过" :value='1'></el-radio>
                        <el-radio label="不通过" :value='0'></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="意见" prop="opinion">
                    <el-input type="textarea" v-model="form.opinion" size='small'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="dialogVisible = false" size='small'>取 消</el-button>
                    <el-button type="success" @click="toAuditRow(form)" size='small'>提交</el-button>
                </el-form-item>
            </el-form>
            <!-- 表单结束 -->
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size='small'>取 消</el-button>
                <el-button type="primary" @click="toAuditRow" size='small'>确 定</el-button>
            </span> -->
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
            form:{},
            select: '',
            grade:[],   //年级可供选择的值
            subject:[],   //根据年级选择的值可供选择的学科
            value1:'',   //年级选择的值
            value2:'',  //根据年级来选择的学科
            isShow:false,  //控制学科下拉框的显示
        }
    },
    created(){
        this.load();
    },
    // 监听下拉框select的变化，改变就查询
    watch:{
        value1:function(old,news){
            // console.log(this.value1);
            this.isShow = this.value1?true:false
            let obj2 = {
                page:1,
                pageSize:1000
            }
            this.loadSubject(obj2).then(r=>{
                this.subject = []
                // 将根据年级名次获取的学科赋给下拉框
                this.subjectInfo.list.forEach((item,index)=>{
                    if(item.grade.name == this.value1){
                        this.subject.push(item)
                    }
                })
            })
        },
        input:function(old,news){
            // console.log(this.input);
            let obj = {
                page:this.page,
                pageSize:this.pagesize,
                name:this.input
            }
            this.loadCourse(obj).then(res=>{
				this.total = this.courseInfo.total
			})
        }
    },
    computed:{
        ...mapState('courseCheck',['courseInfo']),
        ...mapState('subjectManager',['subjectInfo']),
    	...mapState('gradeManager',['gradeInfo'])
	},
    methods:{
        ...mapActions('courseCheck',['loadCourse','auditGrade']),
        ...mapActions('subjectManager',['loadSubject']),
        ...mapActions('gradeManager',['loadGrade']),
        search(){
            if(this.input){
                this.form.name = this.input
            }
            if(this.input == ''){
                delete this.form.name
            }
            if(this.value2){
                this.form.subjectId = this.value2
                this.form.page = 1,
                this.form.pageSize = 1000
            }else{
                this.form.page = this.page,
                this.form.pageSize = this.pagesize
            }
            this.loadCourse(this.form).then(r=>{
                this.form = {}
                // this.value2 = ''
                this.input = ''
                this.total = this.courseInfo.total
            })
        },
        // 确认审核
        toAuditRow(form){
            let obj = {
                id:form.id,
                check:form.status=='通过'?'1':'0',
                opinion:form.opinion
            }
            this.auditGrade(obj).then(r=>{
                this.load()
                this.dialogVisible = false
            })
        },
        // 点击审核
        auditRow(row) {
            // console.log(row);
            this.dialogVisible = true
            this.form.name = row.name
            this.form.introduce = row.introduce
            this.form.id = row.id
            this.form.status = '通过'
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
        // 加载所有课程信息
        load(){
            let obj = {
				page:this.page,
                pageSize:this.pagesize,
                name:this.input,
                subjectId : this.value2
            }
            if(this.input == ''){
                delete obj.name
            }
            if(this.value2 == ''){
                delete obj.subjectId
            }
            this.loadCourse(obj).then(r=>{
                this.total = this.courseInfo.total
            })
            // 加载所有年级信息
            let obj2 = {
                page:1,
                pageSize:10000
            }
            this.loadGrade(obj2).then(r=>{
                // 将年级名称去重之后再给下拉框
                let arr = []
                this.gradeInfo.list.forEach(function(item,index){
                    arr.push(item.name)
                })
                arr.forEach(item=>{
                    if(this.grade.indexOf(item) == -1){
                        this.grade.push(item)
                    }
                })
            })
        }
    }
}
</script> 
<style scoped>
    .courseCheck{
        padding: 10px;
    }
    .courseCheck_button .el-select,.courseCheck_button .el-input{
        width: 20%;
    }
    .courseCheck_button .el-select{
        margin-right: 20px;
    }
    .checkstatus{
        display: inline-block;
        border-radius: 5px;
        padding: 0 5px;
        font-size: 12px;
    }
    .statusPass{
        color: red;
        background-color: #ffeded;
    }
    .statusNo{
        color: green;
        background-color: #e7faf0;
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
    .demo-ruleForm>div:last-child .el-button:first-child:hover{
        color: #2cb5ac;
        background: #c0e9e6;
        border-color: #c0e9e6;
    }
    .demo-ruleForm>div:last-child .el-button:nth-child(2):hover{
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