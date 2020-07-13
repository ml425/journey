import {post_json,get,post} from '../../http/axios'
export default{
    namespaced:true,
    state:{

    },
    mutations:{
    },
    actions:{
        // 删除地址
        async toDeleteLocation(context,params){
            let res = await get('/address/deleteById?id='+params)
        },
        async toAddLocation(context,params){
            let res = await post('/address/saveOrUpdate',params)
        }
    }
}