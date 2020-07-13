<template>
    <div class="customerDetails">
        <el-button type="text" @click="returnCustomer">返回</el-button>
        <!-- 标签页开始 -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="first">
                <!-- {{this.CustomerInfo}} -->
                <!-- 卡片 -->
                <div class="card">
                    <div class="card_top">
                        <img :src="this.CustomerInfo.imgPhoto">
                        <div class="card_top_info">
                            <div>{{this.CustomerInfo.realname?this.CustomerInfo.realname:'暂无此信息'}}</div>
                            <div>{{this.CustomerInfo.comment?this.CustomerInfo.comment:'暂无此信息'}}</div>  
                        </div>
                    </div>
                    <div class="card_bottom">
                        <div class="card_bottom_left">
                            <div>联系方式:{{this.CustomerInfo.telephone?this.CustomerInfo.telephone:'暂无此信息'}}</div>
                            <div>状态:{{this.CustomerInfo.status?this.CustomerInfo.status:'暂无此信息'}}</div>
                            <div>地址:{{this.CustomerInfo.province?this.CustomerInfo.province:'暂无此信息'}}</div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="订单信息" name="second">
                <el-table :data="CustomerOrder" style="width: 100%" class="orderscroll" empty-text='暂无数据' size='small'>
                    <el-table-column
                        prop="id"
                        label="订单编号"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        label="下单时间"
                        width="180">
                        <template slot-scope="{row}">
                            <span>{{row.orderTime | dateParse}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="remark"
                        label="总价">
                    </el-table-column>
                    <el-table-column
			        prop="status"
			        label="状态">
			      </el-table-column>
			      <el-table-column
			        prop="customerId"
			        label="顾客id">
			      </el-table-column>
			       <el-table-column
			        label="操作">
			        <span>详情</span>
			      </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="服务地址" name="third">
                <el-table :data="CustomerAddress" style="width: 100%" empty-text='暂无数据' size='small'>
                    <el-table-column
                        prop="id"
                        label="编号"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="province"
                        label="省"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="city"
                        label="市">
                    </el-table-column>
                    <el-table-column
                        prop="area"
                        label="区/县">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="街道">
                    </el-table-column>
                    <el-table-column
                        prop="telephone"
                        label="手机号">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <!-- 标签页结束 -->
    </div>
</template>
<script>
	import {mapActions,mapState} from 'vuex'
export default {
    data(){
        return {
			activeName: 'first'
		}
    },
    computed:{
        ...mapState('customerDetails',['CustomerInfo','CustomerOrder','CustomerAddress'])
    },
    created(){
        this.loadInfo()
        console.log(this.$route.query.id);
    },
    methods:{
        ...mapActions('customerDetails',['toLoadCustomerInfo',
        'toLoadCustomerOrder','toLoadCustomerAddress']),
        // 返回到顾客管理页面
        returnCustomer(){
            // 路由跳转
            this.$router.push({name:'custermer'})
        },
        // 加载顾客详细信息
        loadInfo(){
            this.toLoadCustomerInfo(this.$route.query.id)
            // 传当前用户的id去查当前用户的所有订单信息
            this.toLoadCustomerOrder(this.$route.query.id)
            // 加载该顾客的地址信息
            this.toLoadCustomerAddress(this.$route.query.id)
        },
        // 组件默认方法 点击标签页时的事件
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
}
</script>
<style scoped>
    .customerDetails{
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
    .card_top{
        width: 100%;
        height: 60%;
        position: relative;
    }
    .card_top img{
        width: 120px;
        height: 120px;
        background-color: #c0c4cc;
        display: block;
        /* 居中 */
        margin: 0 auto;
        border-radius: 50%;
    }
    .card_top_info{
        text-align: center;
    }
    .card_top_info>div:first-child{
        font-size: 22px;
        font-weight: 600;
    }
    .card_bottom{
        width: 100%;
        height: 60%;
    }
    .card_bottom_left{
        height: 100%;
        float: left;
    }
    .card_bottom_left>div{
        margin-top: 15px;
    }
    .orderscroll{
        overflow-y: scroll !important;
        height: 500px !important ;
    }
</style>
