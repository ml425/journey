<template>
    <div class="waiterDetails">
        <el-button type="text" @click="returnWaiter">返回</el-button>
        <!-- 标签页开始 -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="first">
                <!-- {{this.WaiterInfo}} -->
                <!-- 卡片 -->
                <div class="card">
                    <div class="card_top">
                        <img :src="this.WaiterInfo.imgPhoto">
                        <div class="card_top_info">
                            <div>{{this.WaiterInfo.realname?this.WaiterInfo.realname:'暂无此信息'}}</div>
                            <div>{{this.WaiterInfo.comment?this.WaiterInfo.comment:'暂无此信息'}}</div>  
                        </div>
                    </div>
                    <div class="card_bottom">
                        <div class="card_bottom_left">
                            <div>联系方式:{{this.WaiterInfo.telephone?this.WaiterInfo.telephone:'暂无此信息'}}</div>
                            <div>状态:{{this.WaiterInfo.status?this.WaiterInfo.status:'暂无此信息'}}</div>
                            <div>地址:{{this.WaiterInfo.province?this.WaiterInfo.province:'暂无此信息'}}</div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="订单信息" name="second">
                <el-table :data="WaiterOrder" style="width: 100%" class="orderscroll" empty-text='暂无数据' size='small'>
                    <el-table-column
                        prop="id"
                        label="订单编号"
                        width="180" align="center">
                    </el-table-column>
                    <el-table-column
                        label="下单时间"
                        width="180" align="center">
                        <template slot-scope="{row}">
                            <span>{{row.orderTime | dateParse}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="remark"
                        label="总价" align="center">
                    </el-table-column>
                    <el-table-column
			        prop="status"
			        label="状态" align="center">
			      </el-table-column>
			      <el-table-column
			        prop="customerId"
			        label="顾客id" align="center">
			      </el-table-column>
			       <el-table-column
			        label="操作" align="center">
			        <template slot-scope="{row}">
                        <el-button type="text" size="small" @click="toDetails(row)">详情</el-button>
                    </template>
			      </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="收益信息" name="third">
                <el-table :data="WaiterShou" style="width: 100%" empty-text='暂无数据' size='small'>
                    <el-table-column
                        prop="id"
                        label="订单编号"
                        width="180" align="center">
                    </el-table-column>
                    <el-table-column
                        prop="money"
                        label="金额"
                        width="180" align="center">
                    </el-table-column>
                    <el-table-column
                        prop="description"
                        label="描述" show-overflow-tooltip align="center">
                    </el-table-column>
                    <el-table-column
                        prop="transactionTime"
                        label="凭证" align="center">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <!-- 标签页结束 -->
    </div>
</template>
<script>
	import {mapActions,mapState} from 'vuex'
export default {
    data(){
        return {
			activeName: 'first'
		}
    },
    computed:{
        ...mapState('waiterDetails',['WaiterInfo','WaiterOrder','WaiterShou'])
    },
    created(){
        this.loadInfo()
        console.log(this.$route.query.id);
    },
    methods:{
        ...mapActions('waiterDetails',['toLoadWaiterInfo',
        'toLoadWaiterOrder','toLoadWaiterShou']),
        // 点击详情
        toDetails(row){
            // 路由跳转
            this.$router.push({name:'orderDetails',query:{id:row.id,title:'waiter'}})
        },
        // 返回到员工管理页面
        returnWaiter(){
            // 路由跳转
            this.$router.push({name:'waiter'})
        },
        // 加载顾客详细信息
        loadInfo(){
            this.toLoadWaiterInfo(this.$route.query.id)
            // 传当前用户的id去查当前用户的所有订单信息
            this.toLoadWaiterOrder(this.$route.query.id)
            // 加载该顾客的收益信息
            this.toLoadWaiterShou(this.$route.query.id)
        },
        // 组件默认方法 点击标签页时的事件
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
}
</script>
<style scoped>
    .waiterDetails{
        background-color: #fff;
        min-height: calc(100vh - 50px);
        margin: 10px;
        padding: 10px;
        overflow: hidden;
    }
    .card{
        width: 350px;
        height: 350px;
        border-bottom: 1px solid #ccc;
        margin: 10px;
    }
    .card_top{
        width: 100%;
        height: 60%;
        position: relative;
    }
    .card_top img{
        width: 120px;
        height: 120px;
        background-color: #c0c4cc;
        display: block;
        /* 居中 */
        margin: 0 auto;
        border-radius: 50%;
    }
    .card_top_info{
        text-align: center;
    }
    .card_top_info>div:first-child{
        font-size: 22px;
        font-weight: 600;
    }
    .card_bottom{
        width: 100%;
        height: 60%;
    }
    .card_bottom_left{
        height: 100%;
        float: left;
    }
    .card_bottom_left>div{
        margin-top: 15px;
    }
    #pane-third{
        width: 102%;
        height: 450px;
        overflow-y: scroll;
    }
    .orderscroll{
        overflow-y: scroll !important;
        height: 500px !important ;
    }
</style>
