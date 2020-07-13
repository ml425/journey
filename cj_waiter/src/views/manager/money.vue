<template>
    <div class="money">
        <div class="header">
            <div class="header_top">
                <div class="money_return">
                    <van-icon name="arrow-left" color="#1989fa"/>
                    <span @click="moneyReturn">返回</span>
                </div>
                收入列表
            </div>
            <div class="header_bottom">
                <div class="header_bottom_All">
                    <div><van-icon name="balance-o" />收益总金额：{{AllMoney}}</div>
                    <van-button plain type="primary" size='small' @click="Withdraw">提现</van-button>
                </div>
                <div class="header_bottom_list" v-for="t in waiterMoney" :key="t.id">
                    <div>
                        <van-icon name="balance-o" />
                        收益：{{t.money}}
                    </div>
                    <div>
                        <van-icon name="underway-o" />
                        收益时间：{{filters(t.transactionTime)}}
                    </div>
                    <div>
                        <van-icon name="chat-o" />
                        收益描述：{{t.description}}
                    </div>
                    <div>
                        <van-icon name="user-o" />
                        服务对象：{{t.userId}}
                    </div>
                </div>
            </div>
        </div>  
        <!-- {{userInfo}} -->
    </div>
</template>

 <script>
import {mapState,mapActions} from 'vuex' 
export default {
    data(){
        return {
            filters:''
		};
    },
    created(){
        this.loadMoney()
    },
    computed:{
        ...mapState('login',['userInfo','userid']),
        ...mapState('money',['waiterMoney','AllMoney'])
    },
    methods:{
        ...mapActions('money',['toLoadMoneyShou']),
        // 提现
        Withdraw(){
            // 路由跳转页面
            this.$router.push({path:'/manager/moneyWithdraw'})
        },
        // 返回我的页面
        moneyReturn(){
            // 路由跳转到登录页面
            this.$router.push({path:'/manager/user'})
        },
        // 根据员工id获取收入
        loadMoney(){
            let id = this.userid
            this.toLoadMoneyShou(id)
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
    .header{
        width: 100%;
        height: 250px;
        /* overflow: hidden; */
        margin-bottom: 200px;
    }
    .header_top{
        width: 100%;
        line-height: 50px;
        text-align: center;
        border-bottom: 1px solid #eee;
    }
    .money_return{
        float: left;
    }
    .money_return span{
        color: #1989fa;
        cursor: pointer;

    }
    .header_bottom{
        margin: 0 auto;
        font-size: 14px;
        border-radius: 10px;
    }
    .header_bottom_All{
        line-height: 60px;
        padding-left: 20px;
        border-bottom: 1px solid #f1f1f1;
    }
    .header_bottom_All>div:first-child{
        width: 70%;
        display: inline-block;
    }
    .header_bottom_list{
        padding-left: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #f1f1f1;
    }
    .header_bottom_list>div>i{
        width: 10%;
        display: inline-block;
    }
</style>