<template>
    <div class="location">
        <div class="location_top">
            <div class="location_return">
                <van-icon name="arrow-left" color="#1989fa"/>
                <span @click="locationReturn">返回</span>
            </div>
            地址列表
        </div>
        <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        />
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex' 
export default {
    data(){
        return {
            chosenAddressId: '',
            list:[],
            address:{
                id: '',
                name: '',
                tel: '',
                address:''
            }
        };
    },
    created(){
        this.loadLocation()
    },
    computed:{
        ...mapState('login',['userInfo','userid','username']),
        ...mapState('location',['customerLocation'])
    },
    methods:{
        ...mapActions('location',['toLoadLocation']),
        // 返回我的页面
        locationReturn(){
            // 路由跳转到登录页面
            this.$router.push({path:'/manager/user'})
        },
        // 新增地址
        onAdd() {
            // 路由跳转到新增地址页面
            this.$router.push({path:'/manager/addLocation',query:{customerId:this.userid}})
        },
        // 编辑地址
        onEdit(item, index) {
            // Toast('编辑地址:' + index);
            this.$router.push({path:'/manager/addLocation',query:{customerId:this.userid,telephone:this.customerLocation[index].telephone,province:this.customerLocation[index].province,city:this.customerLocation[index].city,area:this.customerLocation[index].area,address:this.customerLocation[index].address,id:this.customerLocation[index].id}})
        },
        // 获取地址
        loadLocation(){
            this.toLoadLocation(this.userid).then(r=>{
                this.customerLocation.forEach((item,index) => {
                    this.address = {}
                    this.address.id = this.customerLocation[index].id
                    this.address.name = this.username+' '+this.userid
                    this.address.tel = this.customerLocation[index].telephone
                    this.address.address = this.customerLocation[index].province+this.customerLocation[index].city+this.customerLocation[index].area+this.customerLocation[index].address
                    this.list.push(this.address)
                });
            })
            
            // console.log(this.list);
        }
    }
}
</script>
<style scoped>
    .location_top{
        width: 100%;
        line-height: 50px;
        text-align: center;
        border-bottom: 1px solid #eee;
    }
    .location_return{
        float: left;
    }
    .location_return span{
        color: #1989fa;
        cursor: pointer;

    }
</style>
