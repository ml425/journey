import axios from '@/http/axios'
export default{
	namespaced:true,
	state:{
		waiter:{}
	},
	getters:{},
	mutations:{
		setwaiter(state,data){
			state.waiter = data
		}
	},
	actions:{
        // 拒绝审核
        async torefuseAudit(context,params){
			let res = await axios.post('/waiter/refusauditing?id='+params)
		},
        // 审核通过
        async topassAudit(context,params){
			let res = await axios.get('/waiter/auditing',params)
			console.log(params);
		},
		// 加载员工信息
		async toLoadwaiter(context,params){
			let res = await axios.post('/waiter/query',params)
			// console.log(res.data.data)
			context.commit('setwaiter',res.data.data)
		}
	}
}