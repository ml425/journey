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
            <van-cell icon="manager-o" title="实名认证" is-link to="/manager/authentication" />
            <van-cell icon="balance-o" title="我的收入" :value="AllMoney" is-link to="/manager/money"/>
        </div>
        <van-button round plain type="info" block @click="toLogout">退出</van-button>
        <!-- {{userInfo}} -->
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
        // 获取收益金额
        this.toLoadMoneyShou(this.userid)
    },
    computed:{
        ...mapState('login',['userInfo','username','userid','useravatar']),
        // 账户余额
        ...mapState('money',['AllMoney']),
        // alert(username);
    },
    methods:{
        ...mapActions('money',['toLoadMoneyShou']),
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