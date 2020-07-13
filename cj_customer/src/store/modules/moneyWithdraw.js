import {post_json,get} from '../../http/axios'
export default{
    namespaced:true,
    state:{
        
    },
    mutations:{
        
    },
    actions:{
        async toRecharge(context,params){
            let res = await get('/customer/recharge',params)
        }
    }
}