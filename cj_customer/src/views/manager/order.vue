<template>
    <div class="order">
        <div class="header">
            <div class="header_top">我的订单</div>
            <div class="header_bottom">
                <van-tabs v-model="active" color='blue'>
                    <van-tab title="全部">
                            <div class="card"  v-for="t in orderbyCustomer" :key="t.id">
                                <div class="card_top">
                                    <div class="card_top_hrader">
                                        <span>订单编号：{{t.id}}</span>
                                        <span>{{t.status}}</span>
                                    </div>
                                    <div class="card_top_content">
                                        <div>产品名称：{{t.orderLines[0].product.name}}</div>
                                        <div>产品说明：{{t.orderLines[0].product.description}}</div>
                                        <div>服务时间：{{filters(t.orderTime)}}</div>
                                        <div>服务地点：{{t.customer.province}} {{t.customer.city}} {{t.customer.city}}</div>
                                        <van-button plain hairline  type="warning" size="small" @click="comfirmPay" v-if="t.status=='待支付'">确认支付</van-button>
                                        <van-button plain hairline  type="warning" size="small" v-else disabled >确认支付</van-button>
                                        <van-button plain hairline  type="warning" size="small" @click="comfirmOrder(t.id)" v-if="t.status=='待确认'">确认订单</van-button>
                                        <van-button plain hairline  type="warning" size="small" v-else disabled>确认订单</van-button>
                                    </div>
                                </div>
                                <div class="card_bottom">
                                    <div>
                                        <span @click="toorderDetails(t.id)">详情</span>
                                    </div>
                                    <div>共计{{t.orderLines.length}}个服务，合计￥{{t.orderLines[0].price}}</div>
                                </div>
                            </div>
                    </van-tab>
                    <van-tab title="待派单">
                        <div class="card"  v-for="t in orderbyCustomerWS" :key="t.id">
                                <div class="card_top">
                                    <div class="card_top_hrader">
                                        <span>订单编号：{{t.id}}</span>
                                        <span>{{t.status}}</span>
                                    </div>
                                    <div class="card_top_content">
                                        <div>产品名称：{{t.orderLines[0].product.name}}</div>
                                        <div>产品说明：{{t.orderLines[0].product.description}}</div>
                                        <div>服务时间：{{filters(t.orderTime)}}</div>
                                        <div>服务地点：{{t.customer.province}} {{t.customer.city}} {{t.customer.city}}</div>
                                        <van-button plain hairline  type="warning" size="small">确认支付</van-button>
                                         <van-button plain hairline  type="warning" size="small">确认订单</van-button>
                                    </div>
                                </div>
                                <div class="card_bottom">
                                    <div @click="toorderDetails(t.id)">详情</div>
                                    <div>共计{{t.orderLines.length}}个服务，合计￥{{t.orderLines[0].price}}</div>
                                </div>
                            </div>
                    </van-tab>
                    <van-tab title="待接单">
                        <div class="card"  v-for="t in orderbyCustomerWR" :key="t.id">
                                <div class="card_top">
                                    <div class="card_top_hrader">
                                        <span>订单编号：{{t.id}}</span>
                                        <span>{{t.status}}</span>
                                    </div>
                                    <div class="card_top_content">
                                        <div>产品名称：{{t.orderLines[0].product.name}}</div>
                                        <div>产品说明：{{t.orderLines[0].product.description}}</div>
                                        <div>服务时间：{{filters(t.orderTime)}}</div>
                                        <div>服务地点：{{t.customer.province}} {{t.customer.city}} {{t.customer.city}}</div>
                                        <van-button plain hairline  type="warning" size="small">确认支付</van-button>
                                         <van-button plain hairline  type="warning" size="small">确认订单</van-button>
                                    </div>
                                </div>
                                <div class="card_bottom">
                                    <div @click="toorderDetails(t.id)">详情</div>
                                    <div>共计{{t.orderLines.length}}个服务，合计￥{{t.orderLines[0].price}}</div>
                                </div>
                            </div>
                    </van-tab>
                    <van-tab title="待确认">
                        <div class="card"  v-for="t in orderbyCustomerWC" :key="t.id">
                                <div class="card_top">
                                    <div class="card_top_hrader">
                                        <span>订单编号：{{t.id}}</span>
                                        <span>{{t.status}}</span>
                                    </div>
                                    <div class="card_top_content">
                                        <div>产品名称：{{t.orderLines[0].product.name}}</div>
                                        <div>产品说明：{{t.orderLines[0].product.description}}</div>
                                        <div>服务时间：{{filters(t.orderTime)}}</div>
                                        <div>服务地点：{{t.customer.province}} {{t.customer.city}} {{t.customer.city}}</div>
                                        <van-button plain hairline  type="warning" size="small">确认支付</van-button>
                                         <van-button plain hairline  type="warning" size="small">确认订单</van-button>
                                    </div>
                                </div>
                                <div class="card_bottom">
                                    <div @click="toorderDetails(t.id)">详情</div>
                                    <div>共计{{t.orderLines.length}}个服务，合计￥{{t.orderLines[0].price}}</div>
                                </div>
                            </div>
                    </van-tab>
                    <van-tab title="已完成">
                        <div class="card"  v-for="t in orderbyCustomerA" :key="t.id">
                                <div class="card_top">
                                    <div class="card_top_hrader">
                                        <span>订单编号：{{t.id}}</span>
                                        <span>{{t.status}}</span>
                                    </div>
                                    <div class="card_top_content">
                                        <div>产品名称：{{t.orderLines[0].product.name}}</div>
                                        <div>产品说明：{{t.orderLines[0].product.description}}</div>
                                        <div>服务时间：{{filters(t.orderTime)}}</div>
                                        <div>服务地点：{{t.customer.province}} {{t.customer.city}} {{t.customer.city}}</div>
                                        <van-button plain hairline  type="warning" size="small">确认支付</van-button>
                                         <van-button plain hairline  type="warning" size="small">确认订单</van-button>
                                    </div>
                                </div>
                                <div class="card_bottom">
                                    <div @click="toorderDetails(t.id)">详情</div>
                                    <div>共计{{t.orderLines.length}}个服务，合计￥{{t.orderLines[0].price}}</div>
                                </div>
                            </div>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex' 
import { Notify } from 'vant';
export default {
    data() {
        return {
            active: 0,
            filters:''
        };
    },
    created(){
        this.loadOrder()
    },
    computed:{
        ...mapState('login',['userInfo','userid']),
        ...mapState('order',['orderbyCustomer','orderbyCustomerWS','orderbyCustomerWR','orderbyCustomerWC','orderbyCustomerA'])
    },
    methods:{
        ...mapActions('order',['toLoadOrder','loadWaitSendOrder','loadWaitReceivingOrder','loadWaitConfirmOrder','loadAccomplishOrder','toComfirmOrder']), 
        // 确认支付
        comfirmPay(){
            Notify({ type: 'warning', message: '暂时没有这个功能哦' });
        },
        // 确认订单
        comfirmOrder(orderId){
            this.toComfirmOrder(orderId).then(r=>{
                Notify({ type: 'success', message: '已确认订单' });
            })
        },
        // 点击详情
        toorderDetails(orderId){
            // 路由跳转
            this.$router.push({path:'/manager/orderDetails',query:{orderId:orderId}})
        },
        loadOrder(){
            // 获取全部订单信息
            this.toLoadOrder(this.userid)
            // 获取待派单订单
            let obj = {
                customerId:this.userid,
                status:'待派单'
            }
            this.loadWaitSendOrder(obj)
             // 获取待接单订单
            let obj2 = {
                customerId:this.userid,
                status:'待接单'
            }
            this.loadWaitReceivingOrder(obj2)
            // 获取待确认订单
            let obj3 = {
                customerId:this.userid,
                status:'待确认'
            }
            this.loadWaitConfirmOrder(obj3)
            // 获取已完成订单
            let obj4 = {
                customerId:this.userid,
                status:'已完成'
            }
            this.loadAccomplishOrder(obj4)
            this.filters = function(date){
                let dates = new Date(date);
                let Y = dates.getFullYear() + '-';
                let M = (dates.getMonth()+1 < 10 ? '0'+(dates.getMonth()+1) : dates.getMonth()+1) + '-';
                let D = (dates.getDate()< 10 ? '0'+dates.getDate() : dates.getDate())+' ';
                let h = (dates.getHours()< 10 ? '0'+dates.getHours() : dates.getHours())+ ':';
                let m = (dates.getMinutes()< 10 ? '0'+dates.getMinutes() : dates.getMinutes())+ ':';
                let s = (dates.getSeconds()< 10 ? '0'+dates.getSeconds() : dates.getSeconds());
                // console.log(Y+M+D+h+m+s);
                let orderDate = Y+M+D+h+m+s
                return orderDate;
            }
        }
    }
}
</script>
<style scoped>
    .order{
        background-color: #f1f1f1;
        /* height: calc(100%-50px);
        height: 600px; */
    }
    .header{
        width: 100%;
        /* height: 250px; */
        overflow: hidden;
    }
    .header_top{
        width: 100%;
        line-height: 50px;
        text-align: center;
        border-bottom: 1px solid #eee;
        background-color: #fff;
    }
    .card{
        background-color: #fff;
        margin: 7px 15px;
        border-radius: 5px;
        font-size: 14px;
        padding: 7px;
    }
    .card_top_hrader{
        height: 40px;
        line-height: 40px;
    }
    .card_top_hrader span:first-child{
        float: left;
    }
    .card_top_hrader span:last-child{
        float: right;
        font-size: 12px;
        color: #fd621f;
    }
    .card_top_content{
        padding-left: 10px;
    }
    .card_bottom{
        text-align: right;
    }
    .card_bottom>div:first-child span{
        color: blue;
        cursor: pointer;
    }
    .van-tabs{
        height: 520px;
        width: 105%;
        overflow-y: scroll;
    }
</style>