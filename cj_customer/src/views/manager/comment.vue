<template>
    <div class="comment">
        <div class="comment_top">
            <div class="comment_return">
                <van-icon name="arrow-left" color="#1989fa"/>
                <span @click="commentReturn">返回</span>
            </div>
            我的评论
        </div>
        <div class="comment_content">
            <van-cell-group>
                <van-cell title="全部评价" :value="commentDate.total" />
            </van-cell-group>
            <div class="content_bottom">顾客：{{userid}} & {{username}}</div>
            <div class="content_content" v-if="commentDate.list[0].orderId" >
                <div v-for="t in commentDate.list" :key="t.id">
                    <div class="content_content_img">
                        <img src="../../assets/user.ef73da64.png" alt="">
                    </div>
                    <div class="content_content_right">
                        <div>订单：{{t.orderId}}</div>
                        <div>评论内容：{{t.content}}</div>
                        <div>评论时间：{{filters(t.commentTime)}}</div>
                    </div>
                </div>
            </div>
            <div class="content_null" v-else>
                无评论
            </div>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex' 
export default {
    data(){
        return{
            filters:''
        }
    },
    created(){
        this.getComment()
    },
    computed:{
        ...mapState('login',['userInfo','username','userid']),
        ...mapState('comment',['commentDate']),
    },
    methods:{
        ...mapActions('comment',['toGetComment']),
        // 根据userid获取评论信息
        getComment(){
            this.toGetComment(this.userid)
            // console.log(this.userid)
            this.filters = function(date){
                let dates = new Date(date);
                let Y = dates.getFullYear() + '-';
                let M = (dates.getMonth()+1 < 10 ? '0'+(dates.getMonth()+1) : dates.getMonth()+1) + '-';
                let D = (dates.getDate()< 10 ? '0'+dates.getDate() : dates.getDate())+' ';
                let h = (dates.getHours()< 10 ? '0'+dates.getHours() : dates.getHours())+ ':';
                let m = (dates.getMinutes()< 10 ? '0'+dates.getMinutes() : dates.getMinutes())+ ':';
                let s = (dates.getSeconds()< 10 ? '0'+dates.getSeconds() : dates.getSeconds());
                // console.log(Y+M+D+h+m+s);
                let orderDate = Y+M+D+h+m+s
                return orderDate;
            }
        },
        // 返回我的页面
        commentReturn(){
            // 路由跳转到登录页面
            this.$router.push({path:'/manager/user'})
        },
    }
}
</script>
<style scoped>
    .comment{
        width: 100%;
        height: 250px;
        /* overflow: hidden; */
        margin-bottom: 200px;
    }
    .comment_top{
        width: 100%;
        line-height: 50px;
        text-align: center;
        border-bottom: 1px solid #eee;
    }
    .comment_return{
        float: left;
    }
    .comment_return span{
        color: #1989fa;
        cursor: pointer;
    }
    .comment_content{
        width: 100%;
    }
    .content_bottom{
        padding: 10px;
        font-size: 14px;
    }
    .van-cell-group{
        background-color: #f1f1f1;
    }
    .van-cell{
        background-color: #f1f1f1;
        color: #323233;
        font-size: 14px;
        margin-top:1em;
        padding: 0 5px;
    }
    .content_content>div{
        width: 90%;
        height: 75px;
        margin: 10px auto;
        background-color: #f1f1f1;
        border-radius: 4px;
        padding: 8px;
    }
    .content_null{
        text-align: center;
        line-height: 75px;
        width: 90%;
        height: 75px;
        margin: 0 auto;
        background-color: #f1f1f1;
        border-radius: 4px;
        padding: 8px;
    }
    .content_content_img{
        float: left;
        width: 20%;
        margin-right: 20px;
    }
    .content_content_img img{
        width: 100%;
    }
    .content_content_right>div{
        margin-bottom: 5px;
        font-size: 14px;
    }
</style>