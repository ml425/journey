<template>
    <div class="orderDetails">
        <div class="orderDetails_top">
            <div class="orderDetails_return">
                <van-icon name="arrow-left" color="#1989fa"/>
                <span @click="orderReturn">返回</span>
            </div>
            订单详情
        </div>
        <div class="orderDetails_content">
            <div class="content_img">
                <img src="../../assets/details.jpg" alt="">
            </div>
            <div class="content_card">
                <div>
                    <span>产品名称：{{orderDetailsDate.orderLines[0].product.name}}</span>
                    <span>下单数量：{{orderDetailsDate.orderLines[0].number}}</span>
                </div>
                <div>总价：{{orderDetailsDate.orderLines[0].price}}</div>
                <div>服务时间：{{orderDetailsDate.orderTime}}</div>
                <div>服务地点：{{orderDetailsDate.address.province}}{{orderDetailsDate.address.city}}{{orderDetailsDate.address.area}}{{orderDetailsDate.address.address}}</div>
            </div>
            <div class="content_bottom">
                <div>
                    <span>我的评价：{{orderDetailsDate.customer.comment}}</span>
                    <van-button plain type="primary" size="mini" @click="toComment">评论</van-button>
                </div>
                <div>顾客：{{userid}} & {{username}}</div>
                <div class="content_content" v-if="orderComment[0]" >
                    <div v-for="t in orderComment" :key="t.id">
                        <div class="content_content_img">
                            <img src="../../assets/user.ef73da64.png" alt="">
                        </div>
                        <div class="content_content_right">
                            <div>订单：{{t.orderId}}</div>
                            <div>评论内容：{{t.content}}</div>
                            <div>评论时间：{{t.commentTime}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 遮罩层开始 -->
        <van-overlay :show="show">
            <div class="wrapper"  @click.stop>
                <van-form @submit="onSubmit">
                    <van-field
                        v-model="cusId"
                        name="cusId"
                        label="顾客编号"
                    />
                    <van-field
                        v-model="orderId"
                        name="orderId"
                        label="订单编号"
                    />
                    <van-field
                        v-model="content"
                        name="content"
                        rows="2"
                        autosize
                        label="评论内容"
                        type="textarea"
                        maxlength="200"
                        placeholder="请输入评论内容"
                        show-word-limit
                    />
                    <div style="margin: 16px;">
                        <van-button round block type="info" native-type="submit">
                        提交
                        </van-button>
                    </div>
                    <div @click="show = false" class="cancel">取消</div>
                 </van-form>
                 <!-- <div>
                    <van-button round block type="info" @click="show = false">
                    取消
                    </van-button>
                </div> -->
            </div>
        </van-overlay>
        <!-- 遮罩层结束 -->
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex' 
import { Dialog } from 'vant';
import { Overlay } from 'vant';
export default {
    data() {
        return {
            cusId:'',
            orderId:'',
            content:'',
            show: false,
            orderComment:[]
        };
    },
    created(){
        this.LoadOrderDetails()
    },
    computed:{
        ...mapState('login',['userInfo','username','userid']),
        ...mapState('orderDetails',['orderDetailsDate']),
        ...mapState('comment',['commentDate']),
    },
    methods:{
        ...mapActions('orderDetails',['toLoadOrderDetails','toSubmitComments']),
        // 评论
        toComment(){
            this.show = true
            this.cusId = this.orderDetailsDate.customer.id
            this.orderId = this.orderDetailsDate.id
            this.content = ''
        },
        //提交评论
        onSubmit(values) {
            // console.log('submit', values);
            this.toSubmitComments(values)
            this.show = false
        },
        // 根据订单id获取订单详情
        LoadOrderDetails(){
            this.toLoadOrderDetails(this.$route.query.orderId)
            this.commentDate.list.forEach((item,index) => {
                if(item.orderId == this.$route.query.orderId){
                    this.orderComment[index] = item
                }
            });
        },
        // 返回订单页面
        orderReturn(){
            // 路由跳转到登录页面
            this.$router.push({path:'/manager/order'})
        },
    }
}
</script>
<style scoped>
    .orderDetails_top{
        width: 100%;
        line-height: 50px;
        text-align: center;
        border-bottom: 1px solid #eee;
    }
    .orderDetails_return{
        float: left;
    }
    .orderDetails_return span{
        color: #1989fa;
        cursor: pointer;
    }
    .orderDetails_content{
        font-size: 14px;
    }
    .content_img{
        width: 140px;
        height: 140px;
        margin: 30px auto;
    }
    .content_img img{
        width: 140px;
        height: 140px;
        border-radius: 50%;
        border: 1px solid #ccc;
    }
    .content_card{
        width: 90%;
        background-color: #f1f1f1;
        margin: 0 auto;
        border-radius: 5px;
        padding: 7px;
    }
    .content_card>div:first-child>span:first-child{
        width: 50%;
        display: inline-block;
    }
    .content_bottom{
        width: 90%;
        margin: 0 auto;
        padding: 12px 7px;
    }
    .content_bottom>div:first-child>span{
        width: 70%;
        display: inline-block;
        margin-bottom: 20px;
    }
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    .cancel{
        border-radius:999px;
        width:80%;
        padding:0 15px;
        font-size:14px;
        color:#fff;
        border: 1px solid #1989fa;
        background-color:#1989fa;
        margin:0 auto;
        height: 44px;
        line-height: 44px;
        text-align: center;
        cursor: pointer;
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
