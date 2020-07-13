import {post_json,get,post} from '../../http/axios'
export default{
    namespaced:true,
    state:{
        WaiterInfoData:[]
    },
    mutations:{
        setWaiterInfoData(state,data){
            state.WaiterInfoData = data
        }
    },
    actions:{
        // 修改信息
        async toUpdateWaiterInfo(context,params){
            let res = await post('/waiter/saveOrUpdate',params)
        },
        // 获取员工信息
        async toLoadWaiterInfo(context,params){
            let res = await get('/waiter/findWaiterById?id='+params)
            context.commit('setWaiterInfoData',res.data)
            // console.log(res.data);
        }
    }
}