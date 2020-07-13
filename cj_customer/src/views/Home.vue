<template>
  <div class="home">
    <router-view></router-view>
    <div class="home_bottpm">
      <!-- <router-link to='/manager/index'>首页</router-link>
      <router-link to='/manager/order'>订单</router-link>
      <router-link to='/manager/user'>用户</router-link> -->
      <van-tabbar v-model="active" route>
        <van-tabbar-item icon="home-o" to='/manager/index'>首页</van-tabbar-item>
        <van-tabbar-item icon="search" to='/manager/order'>订单</van-tabbar-item>
        <van-tabbar-item icon="setting-o" to='/manager/user'>用户</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
}
</script>
<style scoped>
  .home{
    height: 100%;
  }
  .home_bottpm{
    overflow: hidden;
    height: 50px;
  }
</style>
