<template>
    <div class="moneyRecharge">  
        <div class="header">
            <div class="header_top">
                <div class="money_return">
                    <van-icon name="arrow-left" color="#1989fa"/>
                    <span @click="moneyReturn">返回</span>
                </div>
                零钱提现
            </div>
            <div class="header_bottom">
                <span>到账银行卡</span>
                <span>
                    <van-icon name="gold-coin-o" color="#07c160"/>**银行({{customerMoney.bankCard?customerMoney.bankCard:'6688'}})
                    <div>2小时内到账</div>
                </span>
                <span>
                    <van-icon name="arrow" color='#969799'/>
                </span>
            </div>
        </div>
        <div class="content">
            <div>到账金额</div>
            <van-cell-group>
                <van-field v-model="value" label="￥" placeholder="请输入提现金额" />
            </van-cell-group>
            <div>
                <span>当前零钱余额为{{customerMoney.money}}</span>
                <span @click="allRecharge">全部提现</span>
            </div>
            <van-button round block color='#f1f1f1' @click="recharge">提现</van-button>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex' 
import { Notify } from 'vant';
export default {
    data(){
        return{
            value: '',
        }
    },
    computed:{
        ...mapState('login',['userInfo','userid']),
        ...mapState('money',['customerMoney'])
    },
    methods:{
        // 全部提现
        allRecharge(){
            this.value = this.customerMoney.money
            console.log(this.value);
        },
        // 提现
        recharge(){
            // console.log(this.value);
            Notify({ type: 'danger', message: '对不起，没有此接口' });
        },
        moneyReturn(){
            // 路由跳转到余额页面
            this.$router.push({path:'/manager/money'})
        },
    }
}
</script>
<style scoped>
    .header{
        width: 100%;
        height: 200px;
        overflow: hidden;
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
        width: 100%;
        height: 100px;
        background-color: #f1f1f1;
        padding: 3em 0px 0 20px;
        font-size: 14px;
        overflow: hidden;
    }
    .header_bottom span:first-child{
        width: 120px;
        display: inline-block;
    }
    .header_bottom span:nth-child(2){
        width: 200px;
        display: inline-block;
    }
    .header_bottom span:nth-child(2) div{
        font-size:12px;
        color: rgb(204, 204, 204);
    }
    .header_bottom span:nth-child(3){
        width: 50px;
        height: 50px;
        display: inline-block;
        cursor: pointer;
        text-align: center;
    }
    .content{
        width: 100%;
    }
    .content>div{
        width: 90%;
        margin: 0 auto;
    }
    .content>div:first-child{
        font-size: 14px;
        line-height: 24px;
        border-bottom: 1px solid #ccc;
        padding: 10px 0px;
    }
    .content>div:nth-child(3)>span:first-child{
        font-size:12px;
        color: rgb(204, 204, 204);
        width: 70%;
        display: inline-block;
        margin-bottom: 30px;
    }
    .content>div:nth-child(3)>span:nth-child(2){
        font-size:12px;
        color: blue;
        cursor: pointer;
    }
    .van-button{
        color: black !important;
    }
</style>