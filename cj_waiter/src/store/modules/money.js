import {post_json,get} from '../../http/axios'
export default{
    namespaced:true,
    state:{
        waiterMoney:[],
        AllMoney:0
    },
    mutations:{
        setWaiterMoney(state,data){
            state.waiterMoney = data
        },
        setAllMoney(state,data){
            state.AllMoney = 0
            data.forEach((item,index) => {
                state.AllMoney += +(item.money)
            });
        }
    },
    actions:{
        // 根据员工id获取收入
        async toLoadMoneyShou(context,params){
            let res = await get('/waiter/detailsShou?id='+params)
            context.commit('setWaiterMoney',res.data)
            context.commit('setAllMoney',res.data)
            // console.log(res.data);
        }
    }
}