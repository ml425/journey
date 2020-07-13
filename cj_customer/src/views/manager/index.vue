<template>
    <div class="index">
        <div class="index_title">
            <van-icon name="cross" size="30" @click="loginReturn"/>
            便程
        </div>
        <!-- 轮播图开始 -->
        <div class="swipper">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item>
                    <img src="../../assets/home.jpg" alt="">
                </van-swipe-item>
                <van-swipe-item>
                    <img src="../../assets/home1.jpg" alt="">
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- 轮播图结束 -->
        <!-- 栏目 -->
        <div class="category">
            <van-grid :border="false" :column-num="3">
                <van-grid-item @click="toDetails(t.id,index)" v-for="(t,index) in CategoryData" :key="t.id" :icon="t.icon" :text="t.name" />
                <van-grid-item  icon="cart-o"  color="#07c160" badge="更多" @click="toDetails(CategoryData[4].id,5)"/>
            </van-grid>
        </div>
        <!-- 产品 -->
        <div class="product">
            <van-grid :border="false" :column-num="2">
                <van-grid-item @click="toDetails(p.categoryId,index)" v-for="(p,index) in ProductData" :key="p.id">
                    <van-image :src="p.photo" />
                    <div style="margin-top:10px">{{p.name}}</div> 
                </van-grid-item>
            </van-grid>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex' 
export default {
    data(){
		return {

		};
    },
    created(){
        this.loadCategory()
        this.loadProduct()
    },
    computed:{
        ...mapState('index',['CategoryData','ProductData'])
    },
    methods:{
        ...mapActions('index',['toLoadCategory','toLoadProduct']),
        // 退回到登录页面
        loginReturn(){
            // 路由跳转到登录页面
            this.$router.push({path:'/login'})
        },
        // 跳转到详情页
        toDetails(id,index){
            this.$router.push({path:'/manager/details',query:{id:id,index:index}})
        },
        // 加载产品
        loadProduct(){
            let obj = {
                page:0,
                pageSize:4
            }
            this.toLoadProduct(obj)
            console.log(this.ProductData);
        },
        // 加载栏目
        loadCategory(){
            let obj = {
                page:0,
                pageSize:5
            }
            this.toLoadCategory(obj)
        }
    }
}
</script>
<style scoped>
    .index_title{
        width: 90%;
        height: 30px;
        line-height: 30px;
        padding: 16px;
        text-align: center;
        font-size: 20px;
    }
    .index_title>i{
        float: left;
    }
    .swipper{
        width: 100%;
        height: 250px;
    }
    .swipper img{
        width: 100%;
        height: 100%;
    }
</style>