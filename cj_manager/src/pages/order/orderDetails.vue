<template>
    <div class="orderDetails">
        <el-button type="text" @click="returnOrder">返回</el-button>
        <!-- {{this.OrderInfo}} -->
        <!-- 卡片 -->
        <div class="card">
            <div class="card_bottom">
                <div class="card_bottom_left">
                    <div>订单编号: &nbsp;{{this.OrderInfo.id?this.OrderInfo.id:'暂无此信息'}}</div>
                    <div>下单时间: &nbsp;{{this.OrderInfo.orderTime?this.orderDate:'暂无此信息'}}</div>
                    <div>订单状态: &nbsp;{{this.OrderInfo.status?this.OrderInfo.status:'暂无此信息'}}</div>
                    <div>员工编号: &nbsp;{{this.OrderInfo.waiterId?this.OrderInfo.waiterId:'暂无此信息'}}</div>
                    <div>顾客: &nbsp;{{this.OrderInfo.customer?this.OrderInfo.customer.realname:'暂无此信息'}}</div>
                    <div>顾客手机号: &nbsp;{{this.OrderInfo.customer?this.OrderInfo.customer.telephone:'暂无此信息'}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
	import {mapActions,mapState} from 'vuex'
export default {
    data(){
        return {
            orderDate:''
		}
    },
    computed:{
        ...mapState('orderDetails',['OrderInfo'])
    },
    created(){
        this.loadInfo()
    },
    methods:{
        ...mapActions('orderDetails',['toLoadOrderInfo']),
        // 路由跳转返回到订单管理页面或者员工详情页面
        returnOrder(){
            if(this.$route.query.title == 'order'){
                this.$router.push({name:'order'})
            }else{
                this.$router.push({name:'waiter'})
            }
        },
        // 加载订单详细信息
        loadInfo(){
            this.toLoadOrderInfo(this.$route.query.id).then(r=>{
                // console.log(this.OrderInfo);
                if(this.OrderInfo.orderTime){
                    let date = new Date(this.OrderInfo.orderTime);
                    let Y = date.getFullYear() + '-';
                    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                    let D = (date.getDate()< 10 ? '0'+date.getDate() : date.getDate())+' ';
                    let h = (date.getHours()< 10 ? '0'+date.getHours() : date.getHours())+ ':';
                    let m = (date.getMinutes()< 10 ? '0'+date.getMinutes() : date.getMinutes())+ ':';
                    let s = (date.getSeconds()< 10 ? '0'+date.getSeconds() : date.getSeconds());
                    // console.log(Y+M+D+h+m+s);
                    this.orderDate = Y+M+D+h+m+s
                    // console.log(this.orderDate);
                }
            })
        }
    }
}
</script>
<style scoped>
    .orderDetails{
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
    .card_bottom{
        width: 100%;
    }
    .card_bottom img{
        width: 350px;
        height: 350px;
        background-color: #c0c4cc;
        display: block;
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
