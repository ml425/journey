// import axios from '@/http/axios'
import {get,post} from '@/http/axios'

export default{
    namespaced:true,
    state:{
        courseInfo:{},
        subjectInfo:{}
    },
    getters:{},
    mutations:{
        setcourseInfo(state,data){
            state.courseInfo = data;
        },
        setsubjectInfo(state,data){
            state.subjectInfo = data;
        }
    },
    actions:{
        // 删除
        async deleteCourse(context,params){
            let res = await get('/course/deleteById?id='+params)
        },
        // 新增或修改年级信息
        async saveCourse(context,params){
            let res = await post('/course/saveOrUpdate',params)
        },
        // 根据年级查询学科
        async loadSubject(context,params){
            let res = await get('/subject/pageQuery',params)
            context.commit('setsubjectInfo',res.data.data)
        },
        // 查询所有的课程信息
        async loadCourse(context,params){
            let res = await get('/course/pageQuery',params)
            context.commit('setcourseInfo',res.data.data)
            // console.log(res.data.data);
        },
    }
}