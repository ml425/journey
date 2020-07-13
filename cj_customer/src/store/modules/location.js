import {post_json,get} from '../../http/axios'
export default{
    namespaced:true,
    state:{
        customerLocation:[]
    },
    mutations:{
        setcustomerLocation(state,data){
            state.customerLocation = data
        }
    },
    actions:{
        async toLoadLocation(context,params){
            let res = await get('/address/findByCustomerId?id='+params)
            context.commit('setcustomerLocation',res.data)
        }
    }
}