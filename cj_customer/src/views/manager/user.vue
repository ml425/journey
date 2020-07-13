<template>
    <div class="user">
        <div class="header">
            <div class="header_top">我的</div>
            <div class="header_img">
                <img :src="useravatar" alt="">
            </div>
            <div class="header_bottom">你好,{{username}}</div>
        </div>
        <div class="content">
            <van-cell icon="balance-o" title="账户余额" :value="customerMoney.money" is-link to="/manager/money"/>
            <van-cell icon="location-o" title="常用地址" is-link to="/manager/location" />
            <van-cell icon="star-o" title="我的评论" is-link to="/manager/comment" />
            <van-cell icon="phone-o" title="联系我们" is-link @click="connection"/>
        </div>
        <van-button round plain type="info" block @click="toLogout">退出</van-button>
        <!-- {{userInfo}} -->
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex' 
import { Dialog } from 'vant';
export default {
    data(){
        return {

		};
    },
    created(){
        this.loadMoney()
    },
    computed:{
        ...mapState('login',['userInfo','username','userid','useravatar']),
        // 账户余额
        ...mapState('money',['customerMoney'])
    },
    methods:{
        ...mapActions('money',['toLoadMoney']),
        // 获取余额
        loadMoney(){
            let id = this.userid
            this.toLoadMoney(id)
        },
        // 联系我们
        connection(){
            Dialog.alert({
                title: '联系我们',
                message: '0471-1234-888',
                // messageAlign:'left',
                width :'200px'
                }).then(() => {
                // on close
            });
            // console.log(this.username);
        },
        toLogout(){
            // 路由跳转到登录页面
            this.$router.push({path:'/login'})
        }
    }
}
</script>
<style scoped>
    .header{
        width: 100%;
        height: 250px;
        overflow: hidden;
    }
    .header_top{
        width: 100%;
        line-height: 50px;
        text-align: center;
        border-bottom: 1px solid #ccc;
    }
    .header_img{
        margin: 0 auto;
        width: 80px;
        height: 80px;
        margin-top: 20px;
    }
    .header_img img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .header_bottom{
        width: 140px;
        line-height: 40px;
        margin: 0 auto;
        border: 1px solid #ccc;
        text-align: center;
        margin-top: 20px;
        border-radius: 10px;
    }
</style>