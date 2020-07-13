import axios from '@/http/axios'
export default{
	namespaced:true,
	state:{
		category:{},
		categoryParent:{},
		message:''
	},
	getters:{},
	mutations:{
		setcategory(state,data){
			state.category = data
        },
        setCategoryParent(state,data){
			state.categoryParent = data
		},
		setMessage(state,data){
			state.message = data
		}
	},
	actions:{
		// 批量删除
        async toDeleteAll(context,params){
			let res = await axios.post('/category/batchDelete',params)
			context.commit('setMessage',res.data)
        },
		// 删除
        async deleteCategory(context,params){
			let res = await axios.get('/category/deleteById?id='+params)
			context.commit('setMessage',res.data)
			// console.log(res.data);
        },
		//保存员工
        async saveCategory(context,params){
			let res = await axios.post('/category/saveOrUpdate',params)
			// console.log(params);
        },
        // 获取父栏目信息
        async LoadCategoryParent(context,params){
			let res = await axios.get('/category/findAll',params)
			context.commit('setCategoryParent',res.data.data)
		},
		// 加载员工信息
		async toLoadcategory(context,params){
			let res = await axios.post('/category/query',params)
			// console.log(res.data.data)
			context.commit('setcategory',res.data.data)
		}
	}
}