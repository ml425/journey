<template>
    <div class="order">
        <div class="header">
            <div class="header_top">我的订单</div>
            <div class="header_bottom">
                <van-tabs v-model="active" color='blue'>
                    <van-tab title="全部">
                            <div class="card"  v-for="t in orderbyCustomer" :key="t.id">
                                <div class="card_top_hrader">
                                    <span>{{t.customer.username}}</span>
                                    <span>{{t.status}}</span>
                                </div>
                                <div class="card_top_list" >
                                    <div>
                                        <van-icon name="balance-o" />
                                        总额：{{t.orderLines[0].price}}
                                    </div>
                                    <div>
                                        <van-icon name="underway-o" />
                                        下单时间：{{filters(t.orderTime)}}
                                    </div>
                                    <div>
                                        <van-icon name="smile-comment-o" />
                                        产品名称：{{t.orderLines[0].product.name}}
                                    </div>
                                    <div>
                                        <van-icon name="chat-o" />
                                        产品说明：{{t.orderLines[0].product.description}}
                                    </div>
                                    <div>
                                        <van-icon name="location-o" />
                                        地址：{{t.customer.province}} {{t.customer.city}} {{t.customer.city}}
                                    </div>
                                </div>
                                <div class="card_top_bottom">
                                    <span @click="takeOrder(t.id,t.waiterId)" v-if="t.status=='待接单'">接单</span>
                                    <span @click="rejectOrder(t.id)" v-if="t.status=='待接单'">拒单</span>
                                    <span @click="serveOrder(t.id)" v-else-if="t.status=='待服务'">服务</span>
                                    <span @click="confirmOrder(t.id)" v-else-if="t.status=='待确认'">确认</span>
                                </div>
                            </div>
                    </van-tab>
                    <van-tab title="待接单">
                        <div class="card"  v-for="t in orderbyCustomerWS" :key="t.id">
                            <div class="card_top">
                                <div class="card_top_hrader">
                                    <span>{{t.customer.username}}</span>
                                    <span>{{t.status}}</span>
                                </div>
                                <div class="card_top_list" >
                                    <div>
                                        <van-icon name="balance-o" />
                                        总额：{{t.orderLines[0].price}}
                                    </div>
                                    <div>
                                        <van-icon name="underway-o" />
                                        下单时间：{{filters(t.orderTime)}}
                                    </div>
                                    <div>
                                        <van-icon name="smile-comment-o" />
                                        产品名称：{{t.orderLines[0].product.name}}
                                    </div>
                                    <div>
                                        <van-icon name="chat-o" />
                                        产品说明：{{t.orderLines[0].product.description}}
                                    </div>
                                    <div>
                                        <van-icon name="location-o" />
                                        地址：{{t.customer.province}} {{t.customer.city}} {{t.customer.city}}
                                    </div>
                                </div>
                                <div class="card_top_bottom">
                                    <span @click="takeOrder(t.id,t.waiterId)" v-if="t.status=='待接单'">接单</span>
                                    <span @click="rejectOrder(t.id)" v-if="t.status=='待接单'">拒单</span>
                                    <span @click="serveOrder(t.id)" v-else-if="t.status=='待服务'">服务</span>
                                    <span @click="confirmOrder(t.id)" v-else-if="t.status=='待确认'">确认</span>
                                </div>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="待服务">
                        <div class="card"  v-for="t in orderbyCustomerWR" :key="t.id">
                            <div class="card_top">
                                <div class="card_top_hrader">
                                    <span>{{t.customer.username}}</span>
                                    <span>{{t.status}}</span>
                                </div>
                                <div class="card_top_list" >
                                    <div>
                                        <van-icon name="balance-o" />
                                        总额：{{t.orderLines[0].price}}
                                    </div>
                                    <div>
                                        <van-icon name="underway-o" />
                                        下单时间：{{filters(t.orderTime)}}
                                    </div>
                                    <div>
                                        <van-icon name="smile-comment-o" />
                                        产品名称：{{t.orderLines[0].product.name}}
                                    </div>
                                    <div>
                                        <van-icon name="chat-o" />
                                        产品说明：{{t.orderLines[0].product.description}}
                                    </div>
                                    <div>
                                        <van-icon name="location-o" />
                                        地址：{{t.customer.province}} {{t.customer.city}} {{t.customer.city}}
                                    </div>
                                </div>
                                <div class="card_top_bottom">
                                    <span @click="takeOrder(t.id,t.waiterId)" v-if="t.status=='待接单'">接单</span>
                                    <span @click="rejectOrder(t.id)" v-if="t.status=='待接单'">拒单</span>
                                    <span @click="serveOrder(t.id)" v-else-if="t.status=='待服务'">服务</span>
                                    <span @click="confirmOrder(t.id)" v-else-if="t.status=='待确认'">确认</span>
                                </div>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="待确认">
                        <div class="card"  v-for="t in orderbyCustomerWC" :key="t.id">
                            <div class="card_top">
                                <div class="card_top_hrader">
                                    <span>{{t.customer.username}}</span>
                                    <span>{{t.status}}</span>
                                </div>
                                <div class="card_top_list" >
                                    <div>
                                        <van-icon name="balance-o" />
                                        总额：{{t.orderLines[0].price}}
                                    </div>
                                    <div>
                                        <van-icon name="underway-o" />
                                        下单时间：{{filters(t.orderTime)}}
                                    </div>
                                    <div>
                                        <van-icon name="smile-comment-o" />
                                        产品名称：{{t.orderLines[0].product.name}}
                                    </div>
                                    <div>
                                        <van-icon name="chat-o" />
                                        产品说明：{{t.orderLines[0].product.description}}
                                    </div>
                                    <div>
                                        <van-icon name="location-o" />
                                        地址：{{t.customer.province}} {{t.customer.city}} {{t.customer.city}}
                                    </div>
                                </div>
                                <div class="card_top_bottom">
                                    <span @click="takeOrder(t.id,t.waiterId)" v-if="t.status=='待接单'">接单</span>
                                    <span @click="rejectOrder(t.id)" v-if="t.status=='待接单'">拒单</span>
                                    <span @click="serveOrder(t.id)" v-else-if="t.status=='待服务'">服务</span>
                                    <span @click="confirmOrder(t.id)" v-else-if="t.status=='待确认'">确认</span>
                                </div>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="已完成">
                        <div class="card"  v-for="t in orderbyCustomerA" :key="t.id">
                            <div class="card_top">
                                <div class="card_top_hrader">
                                    <span>{{t.customer.username}}</span>
                                    <span>{{t.status}}</span>
                                </div>
                                <div class="card_top_list" >
                                    <div>
                                        <van-icon name="balance-o" />
                                        总额：{{t.orderLines[0].price}}
                                    </div>
                                    <div>
                                        <van-icon name="underway-o" />
                                        下单时间：{{filters(t.orderTime)}}
                                    </div>
                                    <div>
                                        <van-icon name="smile-comment-o" />
                                        产品名称：{{t.orderLines[0].product.name}}
                                    </div>
                                    <div>
                                        <van-icon name="chat-o" />
                                        产品说明：{{t.orderLines[0].product.description}}
                                    </div>
                                    <div>
                                        <van-icon name="location-o" />
                                        地址：{{t.customer.province}} {{t.customer.city}} {{t.customer.city}}
                                    </div>
                                </div>
                                <div class="card_top_bottom">
                                    <span @click="takeOrder(t.id,t.waiterId)" v-if="t.status=='待接单'">接单</span>
                                    <span @click="rejectOrder(t.id)" v-if="t.status=='待接单'">拒单</span>
                                    <span @click="serveOrder(t.id)" v-else-if="t.status=='待服务'">服务</span>
                                    <span @click="confirmOrder(t.id)" v-else-if="t.status=='待确认'">确认</span>
                                </div>
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
        ...mapActions('order',['toLoadOrder','loadWaitSendOrder','loadWaitReceivingOrder','loadWaitConfirmOrder','loadAccomplishOrder','toTakeOrder','toserveOrder','toconfirmOrder','torejectOrder']), 
        // 确认
        confirmOrder(orderId){
            console.log(orderId)
            this.toconfirmOrder(orderId).then(r=>{
                this.loadOrder()
                Notify({ type: 'success', message: '已确认' });
            })
        },
        // 服务
        serveOrder(orderId){
            this.toserveOrder(orderId).then(r=>{
                this.loadOrder()
                Notify({ type: 'success', message: '已服务' });
            })
        },
        // 拒单
        rejectOrder(orderId){
            this.torejectOrder(orderId).then(r=>{
                this.loadOrder()
                Notify({ type: 'success', message: '已拒绝' });
            })
        },
        // 接单
        takeOrder(orderId,waiterId){
            let obj = {
                orderId:orderId,
                waiterId:waiterId
            }
            // console.log(obj)
            this.toTakeOrder(obj).then(r=>{
                this.loadOrder()
                Notify({ type: 'success', message: '已接单' });
            })
        },
        loadOrder(){
            // 获取全部订单信息
            this.toLoadOrder(this.userid)
            // console.log(this.orderbyCustomer);
            // 获取待接单订单
            let obj = {
                waiterId:this.userid,
                status:'待接单'
            }
            this.loadWaitSendOrder(obj)
             // 获取待服务订单
            let obj2 = {
                waiterId:this.userid,
                status:'待服务'
            }
            this.loadWaitReceivingOrder(obj2)
            // 获取待确认订单
            let obj3 = {
                waiterId:this.userid,
                status:'待确认'
            }
            this.loadWaitConfirmOrder(obj3)
            // 获取已完成订单
            let obj4 = {
                waiterId:this.userid,
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
        padding-left: 20px;
        border-bottom: 1px solid #f1f1f1;
    }
    .card_top_hrader span:first-child{
        float: left;
    }
    .card_top_hrader span:last-child{
        float: right;
        font-size: 12px;
        color: #fd621f;
    }
    .card_top_list{
        padding-left: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #f1f1f1;
    }
    .card_top_list>div>i{
        width: 10%;
        display: inline-block;
    }
    .card_top_content{
        padding-left: 10px;
    }
    .card_top_bottom{
        text-align: right;
        color: blue;
    }
    .card_top_bottom>span{
        margin-right: 10px;
        display: inline-block;
        cursor: pointer;
    }
    .van-tabs{
        height: 520px;
        width: 105%;
        overflow-y: scroll;
    }
</style>