<template>
    <div class="authentication">
        <div class="authentication_top">
            <div class="authentication_return">
                <van-icon name="arrow-left" color="#1989fa"/>
                <span @click="authenticationReturn">返回</span>
            </div>
            实名认证
        </div>
        <van-cell title="请上传身份证正反面照" size="large" />
        <van-form @submit="onSubmit">
            <van-field name="uploader">
                <template #input>
                    <van-uploader v-model="uploader" />
                </template>
            </van-field>
            <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">
                验证
            </van-button>
        </div>
        </van-form>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex' 
import { Notify } from 'vant';
export default {
    data(){
        return {
             uploader: [],
        };
    },
    created(){
        
    },
    computed:{
        ...mapState('login',['userInfo','userid','username']),
    },
    methods:{
        ...mapActions('authentication',['toVerification']),
        // 验证
        onSubmit(values) {
            // console.log(values);
            let obj = {
                id : this.userid,
                img1 : values.uploader[0].content,
                img2 : values.uploader[1].content
            }
            this.toVerification(obj)
        },
        // 返回我的页面
        authenticationReturn(){
            // 路由跳转到登录页面
            this.$router.push({path:'/manager/user'})
        },
    }
}
</script>
<style scoped>
    .authentication_top{
        width: 100%;
        line-height: 50px;
        text-align: center;
        border-bottom: 1px solid #eee;
    }
    .authentication_return{
        float: left;
    }
    .authentication_return span{
        color: #1989fa;
        cursor: pointer;
    }
</style>
