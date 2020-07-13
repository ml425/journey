<template>
    <div class="money">
        <div class="header">
            <div class="header_top">
                <div class="money_return">
                    <van-icon name="arrow-left" color="#1989fa"/>
                    <span @click="moneyReturn">返回</span>
                </div>
                账户余额
            </div>
            <div class="header_img">
                <van-icon name="gold-coin" color="orange" size="50" />
            </div>
            <div class="header_bottom">
                我的零钱
                <div>￥{{customerMoney.money}}</div>
            </div>
        </div>  
        <!-- {{userInfo}} -->
        <van-button round type="warning" block @click="Recharge">充值</van-button>
        <van-button round plain type="info" block @click="Withdraw">提现</van-button>
        
    </div>
</template>

 <script>
import {mapState,mapActions} from 'vuex' 
export default {
    data(){
        return {

		};
    },
    created(){
        this.loadMoney()
    },
    computed:{
        ...mapState('login',['userInfo','userid']),
        ...mapState('money',['customerMoney'])
    },
    methods:{
        ...mapActions('money',['toLoadMoney']),
        // 提现
        Withdraw(){
            // 路由跳转页面
            this.$router.push({path:'/manager/moneyWithdraw'})
        },
        // 充值
        Recharge(){
            // 路由跳转页面
            this.$router.push({path:'/manager/moneyRecharge'})
        },
        // 返回我的页面
        moneyReturn(){
            // 路由跳转到登录页面
            this.$router.push({path:'/manager/user'})
        },
        // 获取余额
        loadMoney(){
            let id = this.userid
            this.toLoadMoney(id)
        }
    }
}
</script>
<style scoped>
    .header{
        width: 100%;
        height: 250px;
        overflow: hidden;
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
    .header_img{
        margin: 0 auto;
        width: 50px;
        height: 50px;
        margin-top: 50px;
    }
    .header_img img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .header_bottom{
        width: 120px;
        line-height: 25px;
        margin: 0 auto;
        font-size: 14px;
        text-align: center;
        margin-top: 30px;
        border-radius: 10px;
    }
    .header_bottom div{
        font-size: 28px;
        font-weight: bold;
        text-align: left;
    }
    .van-button{
        margin-bottom: 20px;
    }
</style>