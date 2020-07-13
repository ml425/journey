import {post_json,get} from '../../http/axios'
export default{
    namespaced:true,
    state:{
        orderbyCustomer:[],
        orderbyCustomerWS:[],
        orderbyCustomerWR:[],
        orderbyCustomerWC:[],
        orderbyCustomerA:[]
    },
    mutations:{
        setorderbyCustomer(state,data){
            state.orderbyCustomer = data
        },
        setorderbyCustomerWS(state,data){
            state.orderbyCustomerWS = data
        },
        setorderbyCustomerWR(state,data){
            state.orderbyCustomerWR = data
        },
        setorderbyCustomerWC(state,data){
            state.orderbyCustomerWC = data
        },
        setorderbyCustomerA(state,data){
            state.orderbyCustomerA = data
        }
    },
    actions:{
        // 确认订单
        async toComfirmOrder(context,params){
            let res = await get('/order/confirmOrder?orderId='+params)
            // context.commit('setorderbyCustomerA',res.data)
        },
        // 获取已完成
        async loadAccomplishOrder(context,params){
            let res = await get('/order/query',params)
            context.commit('setorderbyCustomerA',res.data)
        },
        // 获取待确认
        async loadWaitConfirmOrder(context,params){
            let res = await get('/order/query',params)
            context.commit('setorderbyCustomerWC',res.data)
        },
        // 获取待接单
        async loadWaitReceivingOrder(context,params){
            let res = await get('/order/query',params)
            context.commit('setorderbyCustomerWR',res.data)
        },
        // 获取待派单
        async loadWaitSendOrder(context,params){
            let res = await get('/order/query',params)
            context.commit('setorderbyCustomerWS',res.data)
        },
        // 获取所有订单
        async toLoadOrder(context,params){
            let res = await get('/order/query?customerId='+params)
            context.commit('setorderbyCustomer',res.data)
            // console.log(res.data);
        }
    }
}