import axios from '@/http/axios'

export default{
    namespaced:true,
    state:{
        AllOrder:{},
        UnpaidOrder:[],
        WsOrder:[],
        WrOrder:[],
        FServiceOrder:[],
        UnconfirmedOrder:[],
        CompletedOrder:[]
    },
    getters:{},
    mutations:{
        setAllOrder(state,data){
            state.AllOrder = data
        },
        setUnpaidOrder(state,data){
            state.UnpaidOrder = data
        },
        setWsOrder(state,data){
            state.WsOrder = data
        },
        setWrOrder(state,data){
            state.WrOrder = data
        },
        setFServiceOrder(state,data){
            state.FServiceOrder = data
        },
        setUnconfirmedOrder(state,data){
            state.UnconfirmedOrder = data
        },
        setCompletedOrder(state,data){
            state.CompletedOrder = data
        }
    },
    actions:{
        //加载所有订单
        async toLoadAllOrder(context,params){
            let res = await axios.post('/order/queryPage',params)
            context.commit('setAllOrder',res.data.data)
        },
        //加载未支付订单
        async toLoadUnpaidOrder(context,params){
            let res = await axios.post('/order/queryPage',params)
            context.commit('setUnpaidOrder',res.data.data)
        },
        //加载待派单订单
        async toLoadWsOrder(context,params){
            let res = await axios.post('/order/queryPage',params)
            context.commit('setWsOrder',res.data.data)
        },
        //加载待接单订单
        async toLoadWrOrder(context,params){
            let res = await axios.post('/order/queryPage',params)
            context.commit('setWrOrder',res.data.data)
        },
        //加载待服务订单
        async toLoadFServiceOrder(context,params){
            let res = await axios.post('/order/queryPage',params)
            context.commit('setFServiceOrder',res.data.data)
        },
        //加载待确认订单
        async toLoadUnconfirmedOrder(context,params){
            let res = await axios.post('/order/queryPage',params)
            context.commit('setUnconfirmedOrder',res.data.data)
        },
        //加载已完成订单
        async toLoadCompletedOrder(context,params){
            let res = await axios.post('/order/queryPage',params)
            context.commit('setCompletedOrder',res.data.data)
        },
    }
}