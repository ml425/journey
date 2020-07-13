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
		// 删除
        async deleteWaiter(context,params){
            let res = await axios.get('/waiter/deleteById?id='+params)
        },
		//保存员工
        async saveWaiter(context,params){
			let res = await axios.post('/waiter/saveOrUpdate',params)
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