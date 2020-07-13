// import axios from '@/http/axios'
import {get,post} from '@/http/axios'


export default{
    namespaced:true,
    state:{
        informationInfo:[]
    },
    getters:{},
    mutations:{
        setinformationInfo(state,data){
            state.informationInfo = data;
        }
    },
    actions:{
        // 下载文件资料
        async downloadformation(context,params){
            let res = await get('/file/download?url='+params)
        },
        // 删除
        async deleteInformation(context,params){
            let res = await get('/doc/deleteById?id='+params)
        },
        // 新增或修改年级信息
        async saveInformation(context,params){
            let res = await post('/doc/saveOrUpdate',params)
        },
        // 根据课程id加载资料
        async loadInformation(context,params){
            let res = await get('/doc/findByCourseId?id='+params)
            context.commit('setinformationInfo',res.data.data)
            // console.log(res.data.data);
        },
    }
}