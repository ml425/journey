<template>
    <div class="toEnroll">
        <div class="toEnroll_top">
            <div class="toEnroll_return">
                <van-icon name="arrow-left" color="#1989fa"/>
                <span @click="loginReturn">返回</span>
            </div>
            注册
        </div>
        <van-form @submit="onSubmit">
            <van-field
                v-model="telephone"
                name="telephone"
                label="手机号"
                placeholder="手机号"
                left-icon="phone-circle-o"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="vcode"
                center
                clearable
                label="短信验证码"
                placeholder="请输入短信验证码"
                left-icon="comment-circle-o"
                >
                <template #button>
                    <van-button size="small" type="primary">发送验证码</van-button>
                </template>
                </van-field>
            <van-field 
                v-model="password" 
                type="password" 
                label="密码" 
                placeholder="密码" 
                left-icon="other-pay"
            />
        </van-form>
        <div style="margin: 16px;">
            <van-button round block type="info" @click="submit">提交</van-button>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex' 
import { Notify } from 'vant';
export default {
    data(){
        return{
            telephone:'',
            vcode:'',
            password:''
        }
    },
    created(){
        
    },
    methods:{
        ...mapActions('toEnroll',['toGetEnroll','toSubmitEnroll']),
        // 返回登录页面
        loginReturn(){
            // 路由跳转到登录页面
            this.$router.push({path:'/login'})
        },
        // 提交注册
        submit(){
            let obj = {
                telephone : this.telephone,
                password : this.password,
                vcode : this.vcode
            }
            // console.log(obj);
            this.toSubmitEnroll(obj).then(r=>{
                this.telephone = '',
                this.password = '',
                this.vcode = ''
                Notify({ type: 'success', message: '注册成功' });
            })
            // 路由跳转到登录页面
            // this.$router.push({path:'/login'})
        },
        // 获取验证码
        onSubmit(values) {
            // console.log(values);
            // 获取验证码
            this.toGetEnroll(values.telephone)
        },
    }
}
</script>
<style scoped>
    .toEnroll_top{
        width: 100%;
        line-height: 50px;
        text-align: center;
        border-bottom: 1px solid #eee;
    }
    .toEnroll_return{
        float: left;
    }
    .toEnroll_return span{
        color: #1989fa;
        cursor: pointer;

    }
</style>
