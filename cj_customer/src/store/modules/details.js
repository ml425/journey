import {post_json,get,post} from '../../http/axios'
export default{
    namespaced:true,
    state:{
        CategoryDatas:[],
        productDate:[]
    },
    mutations:{
        setCategoryDatas(state,data){
            state.CategoryDatas = data
        },
        setproductDate(state,data){
            state.productDate = data
        }
    },
    actions:{
        // 加载产品
        async toLoadProduct(context,params){
            let res = await get('/product/findAll')
            context.commit('setproductDate',res.data)
            console.log(res.data);
        },
        // 加载栏目
        async toLoadCategorys(context,params){
            let res = await post('/category/query',params)
            context.commit('setCategoryDatas',res.data.list)
            // console.log(res.data);
        }
    }
}