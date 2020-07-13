import axios from '@/http/axios'

export default{
    namespaced:true,
    state:{
        CustomerData:[]
    },
    getters:{},
    mutations:{
        setCustomer(state,data){
            state.CustomerData = data
        }
    },
    actions:{
        // 批量删除
        async toDeleteAll(context,params){
            let res = await axios.post('/customer/batchDelete',params)
        },
        // 删除
        async deleteCustomer(context,params){
            let res = await axios.get('/customer/deleteById?id='+params)
        },
        //保存文章
        async saveCustomer(context,params){
            let res = await axios.post('/customer/saveOrUpdate',params)
        },
        // 加载栏顾客信息
        async toLoadCustomer(context,params){
            let res = await axios.post('/customer/query',params)
            // console.log(res.data.data);
            context.commit('setCustomer',res.data.data)
        },
    }
}