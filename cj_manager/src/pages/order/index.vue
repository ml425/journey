<template>
    <div class="order">
        <!-- 标签页开始 -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="所有订单" name="first">
                <!-- {{this.AllOrder}} -->
                <el-table :data="AllOrder.list" style="width: 100%" empty-text='暂无数据' size='small'>
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
                        prop="total"
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
                <!-- 分页开始 -->
                <div class="customer_page">
                    <el-pagination background layout="total,prev, pager, next" :total="total"  :page-size="pagesize" @current-change="pageChangeHandler">
                    </el-pagination>
                </div>
                <!-- 分页结束 -->
            </el-tab-pane>
            <el-tab-pane label="待支付" name="second">
                <el-table :data="UnpaidOrder.list" style="width: 100%">
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
                        prop="total"
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
                <!-- 分页开始 -->
                <div class="customer_page">
                    <el-pagination background layout="total,prev, pager, next" :total="unpaidtotal"  :page-size="pagesize" @current-change="pageChangeHandler2">
                    </el-pagination>
                </div>
                <!-- 分页结束 -->
            </el-tab-pane>
            <el-tab-pane label="待派单" name="third">
                <el-table :data="WsOrder.list" style="width: 100%">
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
                        prop="total"
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
                <!-- 分页开始 -->
                <div class="customer_page">
                    <el-pagination background layout="total,prev, pager, next" :total="wstotal"  :page-size="pagesize" @current-change="pageChangeHandler3">
                    </el-pagination>
                </div>
                <!-- 分页结束 -->
            </el-tab-pane>
			<el-tab-pane label="待接单" name="fourth">
                <el-table :data="WrOrder.list" style="width: 100%">
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
                        prop="total"
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
                <!-- 分页开始 -->
                <div class="customer_page">
                    <el-pagination background layout="total,prev, pager, next" :total="wrtotal"  :page-size="pagesize" @current-change="pageChangeHandler4">
                    </el-pagination>
                </div>
                <!-- 分页结束 -->
            </el-tab-pane>
			<el-tab-pane label="待服务" name="fifth">
                <el-table :data="FServiceOrder.list" style="width: 100%">
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
                        prop="total"
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
                <!-- 分页开始 -->
                <div class="customer_page">
                    <el-pagination background layout="total,prev, pager, next" :total="fservicetotal"  :page-size="pagesize" @current-change="pageChangeHandler5">
                    </el-pagination>
                </div>
                <!-- 分页结束 -->
            </el-tab-pane>
			<el-tab-pane label="待确认" name="sixth">
                <el-table :data="UnconfirmedOrder.list" style="width: 100%">
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
                        prop="total"
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
                <!-- 分页开始 -->
                <div class="customer_page">
                    <el-pagination background layout="total,prev, pager, next" :total="Unconfirmedtotal"  :page-size="pagesize" @current-change="pageChangeHandler6">
                    </el-pagination>
                </div>
                <!-- 分页结束 -->
            </el-tab-pane>
			<el-tab-pane label="已完成" name="seventh">
                <el-table :data="CompletedOrder.list" style="width: 100%">
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
                        prop="total"
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
                <!-- 分页开始 -->
                <div class="customer_page">
                    <el-pagination background layout="total,prev, pager, next" :total="completedtotal"  :page-size="pagesize" @current-change="pageChangeHandler7">
                    </el-pagination>
                </div>
                <!-- 分页结束 -->
            </el-tab-pane>
        </el-tabs>
        <!-- 标签页结束 -->
    </div>
</template>
<script>
    import {mapActions,mapState} from 'vuex'
    // import allOrder from '@/pages/order/allOrder'
    // import waitPay from '@/pages/order/waitPay'
export default {
    // components:{
    //     allOrder,
    //     waitPay
    // },
    data(){
        return {
			page:0,
	      	total:100,
	      	pagesize:7,
            activeName: 'first',
            // 待支付
            unpaidpage:0,
            unpaidtotal:100,
            // 待派单
            wspage:0,
            wstotal:100,
            // 待接单
            wrpage:0,
            wrtotal:100,
            // 待服务
            fservicepage:0,
            fservicetotal:100,
            // 待确认
            Unconfirmedpage:0,
            Unconfirmedtotal:100,
            // 待确认
            completedpage:0,
            completedtotal:100
		}
    },
    computed:{
        ...mapState('order',['AllOrder','UnpaidOrder','WsOrder','WrOrder','FServiceOrder','UnconfirmedOrder','CompletedOrder'])
    },
    created(){
        this.loadOrder()
    },
    methods:{
        ...mapActions('order',['toLoadAllOrder','toLoadUnpaidOrder','toLoadWsOrder','toLoadWrOrder','toLoadFServiceOrder','toLoadUnconfirmedOrder','toLoadCompletedOrder']),
        // 点击详情
        toDetails(row){
            // 路由跳转
            this.$router.push({name:'orderDetails',query:{id:row.id,title:'order'}})
        },
        //  页码改变的事件处理函数
        pageChangeHandler(page){
            this.page = page-1;
            this.loadOrder()
        },
        pageChangeHandler2(page){
            this.unpaidpage = page-1;
            this.loadOrder()
        },
        pageChangeHandler3(page){
            this.wspage = page-1;
            this.loadOrder()
        },
        pageChangeHandler4(page){
            this.wrpage = page-1;
            this.loadOrder()
        },
        pageChangeHandler5(page){
            this.fservicepage = page-1;
            this.loadOrder()
        },
        pageChangeHandler6(page){
            this.Unconfirmedpage = page-1;
            this.loadOrder()
        },
        pageChangeHandler7(page){
            this.completedpage = page-1;
            this.loadOrder()
        },
        // 加载订单信息
        loadOrder(){
            // 查所有订单信息
            let obj = {
				page:this.page,
				pageSize:this.pagesize,
            }
			this.toLoadAllOrder(obj).then(r=>{
				this.total = this.AllOrder.total
            })
            
            // 加载未支付订单
            let obj2 = {
				page:this.unpaidpage,
                pageSize:this.pagesize,
                status:'待支付'
            }
			this.toLoadUnpaidOrder(obj2).then(r=>{
				this.unpaidtotal = this.UnpaidOrder.total
            })
            // 加载待派单订单
            let obj3 = {
				page:this.wspage,
                pageSize:this.pagesize,
                status:'待派单'
            }
			this.toLoadWsOrder(obj3).then(r=>{
				this.wstotal = this.WsOrder.total
            })
            // 加载待接单订单
            let obj4 = {
				page:this.wrpage,
                pageSize:this.pagesize,
                status:'待接单'
            }
			this.toLoadWrOrder(obj4).then(r=>{
				this.wrtotal = this.WrOrder.total
            })
            // 加载待服务订单
            let obj5 = {
				page:this.fservicepage,
                pageSize:this.pagesize,
                status:'待服务'
            }
			this.toLoadFServiceOrder(obj5).then(r=>{
				this.fservicetotal = this.FServiceOrder.total
            })
            // 加载待确认订单
            let obj6 = {
				page:this.Unconfirmedpage,
                pageSize:this.pagesize,
                status:'待确认'
            }
			this.toLoadUnconfirmedOrder(obj6).then(r=>{
				this.Unconfirmedtotal = this.UnconfirmedOrder.total
            })
            // 加载已完成订单
            let obj7 = {
				page:this.completedpage,
                pageSize:this.pagesize,
                status:'已完成'
            }
			this.toLoadCompletedOrder(obj7).then(r=>{
				this.completedtotal = this.CompletedOrder.total
            })
        },
        // 组件默认方法 点击标签页时的事件
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
}
</script>
<style scoped>
    .order{
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
    /* #pane-second{
        height: 450px;
    } */
</style>
