import axios from '@/http/axios'

export default{
    namespaced:true,
    state:{
        OrderInfo:{}
    },
    getters:{},
    mutations:{
        setOrderInfo(state,data){
            state.OrderInfo = data
        }
    },
    actions:{
        // 加载订单详细信息
        async toLoadOrderInfo(context,params){
            let res = await axios.get('/order/findById?id='+params)
            // console.log(res.data.data);
            context.commit('setOrderInfo',res.data.data)
        },
    }
}