// import axios from '@/http/axios'
import {get,post} from '@/http/axios'


export default{
    namespaced:true,
    state:{
        gradeInfo:{}
    },
    getters:{},
    mutations:{
        setgradeInfo(state,data){
            state.gradeInfo = data;
        }
    },
    actions:{
        // 删除
        async deleteGrade(context,params){
            let res = await get('/grade/deleteById?id='+params)
        },
        // 新增或修改年级信息
        async saveGrade(context,params){
            let res = await post('/grade/saveOrUpdate',params)
        },
        // 查询所有的年级
        async loadGrade(context,params){
            let res = await get('/grade/pageQuery',params)
            context.commit('setgradeInfo',res.data.data)
            // console.log(res.data.data);
        },
    }
}