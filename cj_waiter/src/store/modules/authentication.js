import {post_json,get} from '../../http/axios'
export default{
    namespaced:true,
    state:{
        
    },
    mutations:{
        
    },
    actions:{
        // 验证
        async toVerification(context,params){
            let res = await get('/waiter/auditing',params)
        }
    }
}