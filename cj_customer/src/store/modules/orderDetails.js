import {post_json,get,post} from '../../http/axios'
export default{
    namespaced:true,
    state:{
        orderDetailsDate:[],
    },
    mutations:{
        setorderDetailsDate(state,data){
            state.orderDetailsDate = data
        }
    },
    actions:{
        // 提交评论
        async toSubmitComments(context,params){
            let res = await post('/comment/saveOrUpdate',params)
        },
        // 获取所有订单
        async toLoadOrderDetails(context,params){
            let res = await get('/order/findById?id='+params)
            context.commit('setorderDetailsDate',res.data)
            // console.log(res.data);
        }
    }
}