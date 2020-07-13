import {post_json,get} from '../../http/axios'
export default{
    namespaced:true,
    state:{
        customerMoney:{}
    },
    mutations:{
        setcustomerMoney(state,data){
            state.customerMoney = data
        }
    },
    actions:{
        async toLoadMoney(context,params){
            let res = await get('/customer/findCustomerById?id='+params)
            context.commit('setcustomerMoney',res.data)
            // console.log(res.data);
        }
    }
}