import {post_json,get} from '../../http/axios'
export default{
    namespaced:true,
    state:{
        userInfo:{},
        username:localStorage.getItem('infoName'),
        userid:localStorage.getItem('infoId'),
        useravatar:localStorage.getItem('infoAvatar')
    },
    mutations:{
        setuserInfo(state,data){
            state.userInfo = data
        }
    },
    actions:{
        async login(context,params){
            console.log(params);
            let res = await post_json('/user/login',params)
            let token = res.data.token
            await context.dispatch('info',token)
            // console.log(token);
        },
        async info(context,params){
            let res = await get('/user/info',{token:params})
            context.commit('setuserInfo',res.data)
            localStorage.setItem('infoName',res.data.name)
            localStorage.setItem('infoId',res.data.id)
            localStorage.setItem('infoAvatar',res.data.avatar)
            // console.log(res.data);
        }
    }
}