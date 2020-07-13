// import axios from '@/http/axios'
import {get,post_obj_array} from '@/http/axios'

export default{
    namespaced:true,
    state:{
        homeworkInfo:[]
    },
    getters:{},
    mutations:{
        sethomeworkInfo(state,data){
            state.homeworkInfo = data;
        }
    },
    actions:{
        // 删除
        async deleteHomework(context,params){
            let res = await get('/question/deleteById?id='+params)
        },
        // 新增或修改作业信息
        async saveHomework(context,params){
            let res = await post_obj_array('/question/saveOrUpdate',params)
        },
        // 根据课程id加载作业
        async loadHomework(context,params){
            let res = await get('/question/findByCourseId?courseId='+params)
            context.commit('sethomeworkInfo',res.data.data)
            // console.log(res.data.data);
        },
    }
}