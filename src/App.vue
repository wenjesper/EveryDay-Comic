<script setup lang="ts">
import { ref, onMounted,toRefs } from "vue"
import { storeToRefs } from 'pinia';
import { useNightMode  } from '@/stores/Nighting'
const Store = useNightMode()
const { night } = storeToRefs(Store)
</script>

<template> 
      <div class="zao" v-if="night"></div>
      <router-view />

      <van-tabbar route class="tab" v-if="$route.meta.keepAlive">
        <van-tabbar-item replace to="/" icon="home-o">推荐</van-tabbar-item>
        <van-tabbar-item replace to="/about" icon="search">更新</van-tabbar-item>
        <!-- <van-tabbar-item replace to="/bookshelf" icon="search">书架</van-tabbar-item> -->
        <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
      </van-tabbar>
</template>

<style lang="scss" scoped>
    .tab{
      position: fixed;
      bottom: -3px;
      left: 0;
      height: 50px;
      width: 100%;
      box-sizing: border-box;
    }
    .zao{
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 100;
      pointer-events: none;
    }
</style>
