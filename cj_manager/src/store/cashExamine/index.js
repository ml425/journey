import axios from '@/http/axios'
export default{
	namespaced:true,
	state:{
		waiterShou:{}
	},
	getters:{},
	mutations:{
		setCE(state,data){
			state.waiterShou = data
		}
	},
	actions:{
        // // 查看凭证
        // async toAudit(context,params){
		// 	let res = await axios.get('/waiter/auditing?id='+params)
		// },
        // 审核通过
        async toAudit(context,params){
            let res = await axios.post('/waiter/waiterexamine'+params)
            console.log(params);
		},
		// 加载员工信息
		async toLoadCE(context,params){
			let res = await axios.post('/waiter/queryShou',params)
			// console.log(res.data.data)
			context.commit('setCE',res.data.data)
		}
	}
}