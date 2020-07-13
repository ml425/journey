import axios from '@/http/axios'

export default{
    namespaced:true,
    state:{
        WaiterInfo:{},
        WaiterOrder:[],
        WaiterShou:[]
    },
    getters:{},
    mutations:{
        setWaiterInfo(state,data){
            state.WaiterInfo = data
        },
        setWaiterOrder(state,data){
            state.WaiterOrder = data
        },
        setWaiterShou(state,data){
            state.WaiterShou = data
        }
    },
    actions:{
        //加载该员工的收益信息
        async toLoadWaiterShou(context,params){
            let res = await axios.get('/waiter/detailsShou?id='+params)
            context.commit('setWaiterShou',res.data.data)
            // console.log(res.data.data);
        },
        //加载该员工的所有订单
        async toLoadWaiterOrder(context,params){
            let res = await axios.get('/order/query?waiterId='+params)
            context.commit('setWaiterOrder',res.data.data)
            console.log(res.data.data);
        },
        // 加载员工信息
        async toLoadWaiterInfo(context,params){
            let res = await axios.get('/waiter/findWaiterById?id='+params)
            // console.log(res.data.data);
            context.commit('setWaiterInfo',res.data.data)
        },
    }
}