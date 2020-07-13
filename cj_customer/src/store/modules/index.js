import {post_json,get,post} from '../../http/axios'
export default{
    namespaced:true,
    state:{
        // 栏目的前五条
        CategoryData:[],
        // 产品的前四条
        ProductData:[]
    },
    mutations:{
        setCategoryData(state,data){
            state.CategoryData = data
        },
        setProductData(state,data){
            state.ProductData = data
        }
    },
    actions:{
        // 加载产品
        async toLoadProduct(context,params){
            let res = await post('/product/query',params)
            context.commit('setProductData',res.data.list)
            // console.log(res.data);
        },
        // 加载栏目
        async toLoadCategory(context,params){
            let res = await post('/category/query',params)
            context.commit('setCategoryData',res.data.list)
            // console.log(res.data);
        }
    }
}