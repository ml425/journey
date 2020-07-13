<template>
    <div class="productDetails">
        <el-button type="text" @click="returnProduct">返回</el-button>
        <!-- {{this.ProductInfo}} -->
        <!-- 卡片 -->
        <div class="card">
            <div class="card_bottom">
                <div class="card_bottom_left">
                    <div>产品名称: &nbsp;{{this.ProductInfo.name?this.ProductInfo.name:'暂无此信息'}}</div>
                    <div>产品价格: &nbsp;{{this.ProductInfo.price?this.ProductInfo.price:'暂无此信息'}}</div>
                    <div>产品描述: &nbsp;{{this.ProductInfo.description?this.ProductInfo.description:'暂无此信息'}}</div>
                    <div>产品主图: &nbsp;
                        <img :src="this.ProductInfo.photo">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
	import {mapActions,mapState} from 'vuex'
export default {
    data(){
        return {
		}
    },
    computed:{
        ...mapState('productDetails',['ProductInfo'])
    },
    created(){
        this.loadInfo()
    },
    methods:{
        ...mapActions('productDetails',['toLoadProductInfo']),
        // 返回到产品管理页面
        returnProduct(){
            // 路由跳转
            this.$router.push({name:'product'})
        },
        // 加载顾客详细信息
        loadInfo(){
            this.toLoadProductInfo(this.$route.query.id)
        }
    }
}
</script>
<style scoped>
    .productDetails{
        background-color: #fff;
        min-height: calc(100vh - 50px);
        margin: 10px;
        padding: 10px;
        overflow: hidden;
    }
    .card{
        width: 350px;
        height: 350px;
        border-bottom: 1px solid #ccc;
        margin: 10px;
    }
    .card_bottom{
        width: 100%;
    }
    .card_bottom img{
        width: 350px;
        height: 350px;
        background-color: #c0c4cc;
        display: block;
    }
    .card_bottom_left{
        height: 100%;
        float: left;
    }
    .card_bottom_left>div{
        margin-top: 15px;
    }
    /* #pane-second{
        height: 450px;
    } */
</style>
