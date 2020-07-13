import {post_json,get} from '../../http/axios'
export default{
    namespaced:true,
    state:{
        
    },
    mutations:{
        
    },
    actions:{
        // 提交提现申请
        async tomoneyWithdraw(context,params){
            let res = await get('/waiter/waitercash',params)
        }
    }
}