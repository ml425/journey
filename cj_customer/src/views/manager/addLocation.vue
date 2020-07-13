<template>
    <div class="addLocation">
        <div class="location_top">
            <div class="location_return">
                <van-icon name="arrow-left" color="#1989fa"/>
                <span @click="locationreturn">返回</span>
            </div>
            {{title}}
        </div>
        <div class="location_content">
          <van-form @submit="onSubmit">
            <van-field
              v-model="customerId"
              name="customerId"
              label="顾客编号"
              placeholder="顾客编号"
              :rules="[{ required: true, message: '请填写顾客编号' }]"
            />
            <van-field
              v-model="telephone"
              name="telephone"
              label="联系方式"
              placeholder="联系方式"
              :rules="[{ required: true, message: '请填写联系方式' }]"
            />
            <van-field
              v-model="province"
              name="province"
              label="省份"
              placeholder="省份"
              :rules="[{ required: true, message: '请填写省份' }]"
            />
            <van-field
              v-model="city"
              name="city"
              label="城市"
              placeholder="城市"
              :rules="[{ required: true, message: '请填写城市' }]"
            />
            <van-field
              v-model="area"
              name="area"
              label="区域"
              placeholder="区域"
              :rules="[{ required: true, message: '请填写区域' }]"
            />
            <van-field
              v-model="address"
              name="address"
              label="具体位置"
              placeholder="具体位置"
              :rules="[{ required: true, message: '请填写具体位置' }]"
            />
            <div style="margin: 16px;">
              <van-button round block type="info" native-type="submit">
                确定
              </van-button>
            </div>
          </van-form>
          <van-button v-if="this.$route.query.customerId" plain round block type="danger" @click="deleteLocation">删除</van-button>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
import { Dialog } from 'vant'
export default {
    data() {
    return {
      customerId: '',
      telephone: '',
      province: '',
      city: '',
      area: '',
      address:'',
      list:{},
      id:'',
      title:''
    };
  },
  created(){
    this.edit()
  },
  methods: {
    ...mapActions('addLocation',['toAddLocation','toDeleteLocation']),
    //   返回地址列表页面
    locationreturn(){
        // 路由跳转回到地址列表
        this.$router.push({path:'/manager/location'})
    },
    // 删除地址
    deleteLocation(){
      // console.log(this.id);
      Dialog.confirm({
        title: '删除地址',
        message: '删除操作不可返回，请问是否删除？',
      }).then(() => {
          this.toDeleteLocation(this.id)
          // 路由跳转回到地址列表
          this.$router.push({path:'/manager/location'})
        })
        // .catch(() => {
        //   // on cancel
        // });
    },
    // 给表单赋值
    edit(){
      this.title = this.$route.query.id?'修改地址':'新增地址'
      if(this.$route.query.customerId){
        this.customerId = this.$route.query.customerId
        this.telephone = this.$route.query.telephone?this.$route.query.telephone:''
        this.province = this.$route.query.province?this.$route.query.province:''
        this.city = this.$route.query.city?this.$route.query.city:''
        this.area = this.$route.query.area?this.$route.query.area:''
        this.address = this.$route.query.address?this.$route.query.address:''
        // 获取地址id用来表示这是更新
        this.id = this.$route.query.id?this.$route.query.id:''
      }
    },
    // 点击确定保存地址信息
    onSubmit(values) {
      // values就是输入的地址信息对象
      this.list = values
      // 将保存起来的地址id传给list
      this.list.id = this.id
      // console.log(this.list);
      this.toAddLocation(this.list);
      // 路由跳转回到地址列表
      this.$router.push({path:'/manager/location'})
    },
  },
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
    .location_content>.van-button--block{
      width: 93%;
      margin: 0 auto;
    }
</style>