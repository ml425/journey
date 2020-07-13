import axios from '@/http/axios'

export default{
    namespaced:true,
    state:{
        CommentData:[]
    },
    getters:{},
    mutations:{
        setComment(state,data){
            state.CommentData = data
        }
    },
    actions:{
        // 拒绝审核
        async refuseComment(context,params){
            let res = await axios.get('/comment/commentRefuseExamine?commentid='+params)
        },
        // 通过审核
        async promiseComment(context,params){
            let res = await axios.get('/comment/commentExamine?commentid='+params)
        },
        // 删除
        async deleteComment(context,params){
            let res = await axios.get('/comment/deleteById?id='+params)
        },
        // 加载评论信息
        async toLoadComment(context,params){
            let res = await axios.post('/comment/query',params)
            // console.log(res.data.data);
            context.commit('setComment',res.data.data)
        },
    }
}