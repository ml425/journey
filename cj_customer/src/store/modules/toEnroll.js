import {post_json,get} from '../../http/axios'
export default{
    namespaced:true,
    state:{
        
    },
    mutations:{
    },
    actions:{
         // 注册
         async toSubmitEnroll(context,params){
            let res = await get('/customer/customerRegister',params)
        },
        // 获取验证码
        async toGetEnroll(context,params){
            let res = await get('/customer/getVerCode?telephone='+params)
        }
    }
}