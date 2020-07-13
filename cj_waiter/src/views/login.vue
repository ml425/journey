<template>
  <div class="login">
	  <div class="header">
		  <div class="header_top">便</div>
		  <div class="header_boottom">
			  <span>便程服务云平台</span>
			  <span>员工端</span>
		  </div>
	  </div>
	  <div class="form">
		<van-form @submit="onSubmit">
			<van-field
				v-model="username"
				name="用户名"
				label="用户名"
				placeholder="请输入用户名"
				:rules="[{ required: true, message: '请填写用户名' }]"
			/>
			<van-field
				v-model="password"
				type="password"
				name="密码"
				label="密码"
				placeholder="请输入密码"
				:rules="[{ required: true, message: '请填写密码' }]"
			/>
			<div style="margin: 16px;">
				<van-button round block type="info" native-type="submit">
				登录
				</van-button>
			</div>
		</van-form>
		<div class="enroll" @click="toEnroll">尚未注册？点击注册</div>
	  </div>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex' 
export default {
    data(){
		return {
			username: '',
			password: '',
		};
    },
    methods:{
		...mapActions('login',['login']),
		// 注册
		toEnroll(){
			// 路由跳转页面
			this.$router.push({path:'/manager/toEnroll'})
		},
		onSubmit(values) {
			let obj = {
				username:this.username,
				password:this.password,
				type:'waiter'
			}
			this.login(obj).then(r=>{
				this.$router.push({path:'/manager/index'})
			})
		},
    }
}
</script>
<style scoped>
	.header{
		width: 100%;
		height: 250px;
		background-color: #add2fd;
		overflow: hidden;
	}
	.header_top{
		width: 60px;
		height: 60px;
		border: 1px solid #fff;
		margin: 0 auto;
		margin-top: 50px;
		border-radius: 50%;
		text-align: center;
		line-height: 60px;
		font-size: 20px;
		font-weight: bold;
		color: #fff;
	}
	.header_boottom{
		margin-top: 10px;
		text-align: center;
	}
	.header_boottom span:first-child{
		font-size: 25px;
		color: #fff;
		margin-right: 20px;
	}
	.header_boottom span:last-child{
		font-size: 20px;
		color: #fff;
	}
	.enroll{
		width: 30%;
		margin: 0 auto;
		background-color: #f1f1f1;
		font-size: 12px;
		color: green;
		cursor: pointer;
	}
	.van-button{
		background-color: #add2fd;
		border-color: #add2fd;
	}
</style>