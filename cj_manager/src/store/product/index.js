import axios from '@/http/axios'

export default{
    namespaced:true,
    state:{
        ProductData:[],
        categoryParent:{}
    },
    getters:{},
    mutations:{
        setProduct(state,data){
            state.ProductData = data
        },
        setCategoryParent(state,data){
			state.categoryParent = data
		}
    },
    actions:{
        // 批量删除
        async toDeleteAll(context,params){
            let res = await axios.post('/product/batchDelete',params)
        },
        // 删除
        async deleteProduct(context,params){
            let res = await axios.get('/product/deleteById?id='+params)
        },
        //保存文章
        async saveProduct(context,params){
            let res = await axios.post('/product/saveOrUpdate',params)
        },
        // 获取栏目信息
        async LoadCategoryParent(context,params){
			let res = await axios.get('/category/findAll',params)
			context.commit('setCategoryParent',res.data.data)
		},
        // 加载产品信息
        async toLoadProduct(context,params){
            let res = await axios.post('/product/query',params)
            console.log(res.data.data);
            context.commit('setProduct',res.data.data)
        },
    }
}