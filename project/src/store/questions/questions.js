// import axios from '@/http/axios'
import {get,post} from '@/http/axios'


export default{
    namespaced:true,
    state:{
        questionInfo:[]
    },
    getters:{},
    mutations:{
        setQuestionInfo(state,data){
            state.questionInfo = data;
        }
    },
    actions:{
        // 删除
        async deleteQuestion(context,params){
            let res = await get('/comment/deleteById?id='+params)
        },
        // 新增问题
        async saveQuestion(context,params){
            let res = await post('/comment/saveOrUpdate',params)
        },
        // 回复问题
        async saveReply(context,params){
            let res = await post('/comment/reply',params)
        },
        // 根据课程id加载问题
        async loadQuestion(context,params){
            let res = await get('/comment/findByCourseId?id='+params)
            context.commit('setQuestionInfo',res.data.data)
            // console.log(res.data.data);
        },
    }
}