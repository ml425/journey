import {post_json,get,post} from '../../http/axios'
export default{
    namespaced:true,
    state:{
        commentDate:{}
    },
    mutations:{
        setComment(state,data){
            state.commentDate = data
        }
    },
    actions:{
        // 根据userid获取评论信息
        async toGetComment(context,params){
            let res = await get('/comment/findCommentByCus?cusId='+params)
            context.commit('setComment',res.data)
            console.log(res.data);
        },
    }
}