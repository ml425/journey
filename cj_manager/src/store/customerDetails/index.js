import axios from '@/http/axios'

export default{
    namespaced:true,
    state:{
        CustomerInfo:{},
        CustomerOrder:{},
        CustomerAddress:[]
    },
    getters:{},
    mutations:{
        setCustomerInfo(state,data){
            state.CustomerInfo = data
        },
        setCustomerOrder(state,data){
            state.CustomerOrder = data
        },
        setCustomerAddress(state,data){
            state.CustomerAddress = data
        }
    },
    actions:{
        //加载该顾客的地址信息
        async toLoadCustomerAddress(context,params){
            let res = await axios.get('/address/findByCustomerId?id='+params)
            context.commit('setCustomerAddress',res.data.data)
            console.log(res.data.data);
        },
        //加载该顾客的所有订单
        async toLoadCustomerOrder(context,params){
            let res = await axios.get('/order/query?customerId='+params)
            context.commit('setCustomerOrder',res.data.data)
        },
        // 加载栏顾客信息
        async toLoadCustomerInfo(context,params){
            let res = await axios.get('/customer/findCustomerById?id='+params)
            // console.log(res.data.data);
            context.commit('setCustomerInfo',res.data.data)
        },
    }
}