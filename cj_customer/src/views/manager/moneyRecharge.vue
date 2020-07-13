<template>
    <div class="moneyRecharge">  
        <div class="header">
            <div class="header_top">
                <div class="money_return">
                    <van-icon name="arrow-left" color="#1989fa"/>
                    <span @click="moneyReturn">返回</span>
                </div>
                充值
            </div>
            <div class="header_bottom">
                <span>充值方式</span>
                <span>
                    <van-icon name="gold-coin-o" color="#07c160"/>**银行(6688)
                    <div>单日交易限额￥50000.00</div>
                </span>
                <span>
                    <van-icon name="arrow" color='#969799'/>
                </span>
            </div>
        </div>
        <div class="content">
            <div>充值金额</div>
            <van-cell-group>
                <van-field v-model="value" label="￥" placeholder="请输入充值金额" />
            </van-cell-group>
            <van-button round block type="info" @click="recharge">充值</van-button>
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
    },
    methods:{
        ...mapActions('moneyRecharge',['toRecharge']),
        // 充值
        recharge(){
            let obj = {
                id:this.userid,
                money:this.value
            }
            console.log(obj)
            this.toRecharge(obj).then(r=>{
                Notify({ type: 'success', message: '充值成功' });
                this.value = ''
            })
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
        /* padding: 40px; */
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
</style>