// import axios from '@/http/axios'
import {get,post} from '@/http/axios'


export default{
    namespaced:true,
    state:{
        subjectInfo:{}
    },
    getters:{},
    mutations:{
        setsubjectInfo(state,data){
            state.subjectInfo = data;
        }
    },
    actions:{
        // 删除
        async deleteGrade(context,params){
            let res = await get('/subject/deleteById?id='+params)
        },
        // 新增或修改学科信息
        async saveGrade(context,params){
            let res = await post('/subject/saveOrUpdate',params)
        },
        // 查询所有的学科
        async loadSubject(context,params){
            let res = await get('/subject/pageQuery',params)
            context.commit('setsubjectInfo',res.data.data)
            // console.log(res.data.data);
        },
    }
}