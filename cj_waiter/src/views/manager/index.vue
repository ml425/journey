<template>
    <div class="index">
        <div class="index_title">
            <van-icon name="cross" size="30" @click="loginReturn"/>
            便程
        </div>
        <div class="index_content">
            <div class="index_content_top">
                <div class="top_left">
                    <div>收益金额</div>
                    <div>{{AllMoney}}元</div>
                </div>
                <div class="top_right">
                    <div>我的金额</div>
                    <div>{{WaiterInfoData.money}}元</div>
                </div>
            </div>
            <div class="index_content_bottom">
                <van-form @submit="onSubmit">
                    <van-field
                        v-model="username"
                        name='username'
                        clearable
                        label="会员名"
                        left-icon="music-o"
                        placeholder="暂无此信息"
                    />
                    <van-field
                        v-model="realname"
                        name='realname'
                        clearable
                        label="真实姓名"
                        left-icon="music-o"
                        placeholder="暂无此信息"
                    />
                    <van-field
                        v-model="telephone"
                        name='telephone'
                        clearable
                        label="联系方式"
                        left-icon="music-o"
                        placeholder="暂无此信息"
                    />
                    <van-field
                        v-model="idCard"
                        name='idCard'
                        clearable
                        label="身份证号"
                        left-icon="music-o"
                        placeholder="暂无此信息"
                    />
                    <van-field
                        v-model="bankCard"
                        name='bankCard'
                        clearable
                        label="银行卡号"
                        left-icon="music-o"
                        placeholder="暂无此信息"
                    />
                    <div class="address">
                        <div>
                            <van-field
                            v-model="province"
                            name='province'
                            clearable
                            label="地址"
                            left-icon="music-o"
                            placeholder="所在省"
                            />
                        </div>
                        <div>
                            <van-field
                            v-model="city"
                            name='city'
                            clearable
                            placeholder="所在市"
                            />
                        </div>
                        <div>
                            <van-field
                            v-model="area"
                            name='area'
                            clearable
                            placeholder="所在区"
                            />
                        </div>
                    </div>
                    <div style="margin: 16px;">
                        <van-button round block native-type="submit" color="#f1f1f1">
                        修改
                        </van-button>
                    </div>
                </van-form>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex' 
import { Notify } from 'vant';
export default {
    data(){
		return {
            username: '',
            realname: 'aa',
            telephone: 'vv',
            idCard: 'cc',
            bankCard: 'dd',
            province: 'ee',
            city:'',
            area:'',
            // address:{
            //     province:'',
            //     city:'',
            //     area:''
            // }
		};
    },
    created(){
        this.loadWaiterInfo()
    },
    computed:{
        ...mapState('index',['WaiterInfoData']),
        // 账户余额
        ...mapState('money',['AllMoney']),
        ...mapState('login',['userInfo','userid']),
    },
    methods:{
        ...mapActions('index',['toLoadWaiterInfo','toUpdateWaiterInfo']),
        ...mapActions('money',['toLoadMoneyShou']),
        // 退回到登录页面
        loginReturn(){
            // 路由跳转到登录页面
            this.$router.push({path:'/login'})
        },
        // 加载个人信息
        loadWaiterInfo(){
            // 获取收益金额
            this.toLoadMoneyShou(this.userid)
            // 获取员工信息
            this.toLoadWaiterInfo(this.userid).then(r=>{
                this.username = this.WaiterInfoData.username
                this.realname = this.WaiterInfoData.realname
                this.telephone = this.WaiterInfoData.telephone
                this.idCard = this.WaiterInfoData.idCard
                this.bankCard = this.WaiterInfoData.bankCard
                this.province = (this.WaiterInfoData.province?this.WaiterInfoData.province:'')
                this.city = (this.WaiterInfoData.city?this.WaiterInfoData.city:'')
                this.area = (this.WaiterInfoData.area?this.WaiterInfoData.area:'')
            })
        },
        // 修改
        onSubmit(values) {
            values.id = this.WaiterInfoData.id
            values.type = this.WaiterInfoData.type
            // console.log(values);
            this.toUpdateWaiterInfo(values).then(r=>{
            Notify({ type: 'success', message: '修改成功' });
            })
        },
    }
}
</script>
<style scoped>
    .index_title{
        width: 90%;
        height: 30px;
        line-height: 30px;
        padding: 16px;
        text-align: center;
        font-size: 20px;
    }
    .index_title>i{
        float: left;
    }
    .index_content_top{
        padding: 1px;
        height: 75px;
    }
    .index_content_top>div{
        width: 49.9%;
        height: 60px;
        background-color: #add2fd;
        display: inline-block;
        text-align: center;
        font-size: 18px;
        color: #fff;
        padding-top: 15px;
    }
    .top_left{
        float: left;
    }
    .top_right{
        float: right;
    }
    .van-cell__value{
        text-align:left;
        flex: 3;
        color: black;
    }
    .van-button{
        color: #000 !important;
    }
    .address{
        display: flex;
        border-bottom: 1px solid #eee;
        margin-left: 16px;
    }
    .address>div:first-child{
        flex: 2;
    }
    .address>div:first-child div{
        padding-left: 0;
    }
    .address>div:nth-child(2){
        flex: 1;
    }
    .address>div:nth-child(3){
        flex: 1;
    }
</style>