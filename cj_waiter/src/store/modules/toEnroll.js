import {post_json,get,post} from '../../http/axios'
export default{
    namespaced:true,
    state:{
        
    },
    mutations:{
    },
    actions:{
         // 注册
         async toSubmitEnroll(context,params){
            let res = await post('/waiter/waiterRegister',params)
        },
        // 获取验证码
        async toGetEnroll(context,params){
            let res = await get('/waiter/getVerCode?telephone='+params)
        }
    }
}