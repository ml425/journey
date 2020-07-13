import axios from '@/http/axios'

export default{
    namespaced:true,
    state:{
        ProductInfo:{}
    },
    getters:{},
    mutations:{
        setProductInfo(state,data){
            state.ProductInfo = data
        }
    },
    actions:{
        // 加载产品详细信息
        async toLoadProductInfo(context,params){
            let res = await axios.get('/product/findById?id='+params)
            // console.log(res.data.data);
            context.commit('setProductInfo',res.data.data)
        },
    }
}