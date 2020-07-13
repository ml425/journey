<template>
    <div class="details">
        <div class="header_top">
            <div class="index_return">
                <van-icon name="arrow-left" color="#1989fa"/>
                <span @click="indexReturn">返回</span>
            </div>
            产品列表
        </div>
        <van-row>
            <van-col span="4">
                <van-sidebar v-model="activeKey">
                    <van-sidebar-item @click="toLoadPc(t.id)" v-for="t in CategoryDatas" :key="t.id" :title="t.name" />
                    <!-- <van-sidebar-item title="标签名称" />
                    <van-sidebar-item title="标签名称" />
                    <van-sidebar-item title="标签名称" /> -->
                </van-sidebar>
            </van-col>
            <van-col span="20">
                <van-card v-for="(c,index) in productDate" :key="c.id"
                :num="c.number"
                :price="c.price"
                :desc="c.description"
                :title="c.name"
                :thumb="c.phote">
                    <template #footer>
                        <van-stepper @change='change(c.number,c.price,index)' :min='0' v-model="c.number" />
                    </template>
                </van-card>
            </van-col>
        </van-row>
        <div class="details_footer">
            <van-row>
                <van-col span="12">
                    总额￥{{allMoney}}
                </van-col>
                <van-col span="8"></van-col>
                <van-col span="4">立即下单</van-col>
            </van-row>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
    data() {
        return {
            activeKey: 0,
            value: 1,
            arr:[],
            allMoney:'',
            total:[]
        };
    },
    created(){
        this.load()
        this.loadProduct()
    },
    computed:{
        ...mapState('details',['CategoryDatas','productDate'])
    },
    methods:{
        ...mapActions('details',['toLoadCategorys','toLoadProduct']),
        // 返回首页页面
        indexReturn(){
            // 路由跳转到登录页面
            this.$router.push({path:'/manager/index'})
        },
        // 计算总额 当#footer步滑器里绑定的值发生改变时触发
        change(num,price,index){
            this.total[index] = Number(num * price)
            this.allMoney = 0
            // this.total存放的是每一种商品的价格总合
            this.total.forEach((item,index) => {
                this.allMoney = this.allMoney + item
            });
        },
        // 根据栏目id过滤对应产品
        // toLoadPc(id){
        //     // id是栏目id，productDate是所有产品信息
        //     this.arr = this.productDate.filter((item,index)=>{
        //         return id == item.id
        //     })
        //     // arr就是所有对应栏目的产品
        // },
        // 加载产品
        loadProduct(){
            this.toLoadProduct()
        },
        load(){
            let obj = {
                page:0,
                pageSize:100
            }
            this.toLoadCategorys(obj).then(r=>{
                this.activeKey = this.$route.query.index
            })
        }
    }
}
</script>
<style scoped>
    .details_footer{
        width: 85%;
        height: 50px;
        line-height: 50px;
        background-color: rgba(0,0,0,.3);
        color: #fff;
        font-size: 14px;
        padding: 0 100px 0 50px;
        position: fixed;
        bottom: 50px;
        left: 0;
    }
    /* .details_footer>div:first-child{
        float: left;
    }
    .details_footer>div:nth-child(2){
        float: right;
    } */
    .header_top{
        width: 100%;
        line-height: 50px;
        text-align: center;
        border-bottom: 1px solid #eee;
    }
    .index_return{
        float: left;
    }
    .index_return span{
        color: #1989fa;
        cursor: pointer;

    }
</style>