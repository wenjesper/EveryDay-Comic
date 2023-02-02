<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { useRouter, RouterLink, RouterView } from 'vue-router'
import { Api } from "@/api";
const num = ref(0)
const change = (id: number) => {
  num.value = id
}
const h = ref<string>()
const h2 = ref()
const handleScroll = () => {
  let scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;
  // isFixed.value =
  //     scrollTop > fixedName.value.getBoundingClientRect().top ? true : false;
  let o = scrollTop / 200
  if (o == 0.8) {
    o = 1
  }
  h2.value = o
  h.value = `rgba(255, 255, 255,${o})`
  console.log(o);

};
// const gethome = async()=>{
//   let {data} = await Api.getHomeData()
//   console.log(data);

// }
const router = useRouter()
const gosearch = () => {
  router.push({
    path: '/search',
  })
}
onMounted(async () => {
  console.log(router.currentRoute.value.name);
  window.addEventListener('scroll', handleScroll);
  if (router.currentRoute.value.name !== 'recommend') {
    router.push({
      path: 'recommend',
    })
  }
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

</script>

<template>
  <div class="home">
    <div :class="num !== 1 ? 'nav nav2' : 'nav'" :style="num !== 1 ? {} : { backgroundColor: h }">
      <!-- <div :class="num==2?'nav nav2':'nav'" :style="{backgroundColor:h}"> -->
      <div class="tips">
        <router-link @click="change(0)" to="recommend"
          :class="num == 0 ? (h2 == 1 ? 'active2' : 'active1') : (h2 == 1 ? 'item2' : 'item')">推荐</router-link>
        <router-link @click="change(1)" to="bangdan"
          :class="num == 1 ? (h2 == 1 ? 'active2' : 'active1') : (h2 == 1 ? 'item2' : 'item')">榜单</router-link>
        <router-link @click="change(2)" to="classify"
          :class="num == 2 ? (h2 == 1 ? 'active2' : 'active1') : (h2 == 1 ? 'item2' : 'item')">分类</router-link>
      </div>
      <div class="inpbox">
        <div class="inp" @click="gosearch">
          <van-icon name="search" color="#fff" />
          你好
        </div>
      </div>
    </div>
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 100%;

  .nav2 {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #afafaf;
  }

  .nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    z-index: 20;
    display: flex;

    .tips {
      display: flex;
      flex: 0 0 60%;

      .active1 {
        color: #fff;
        font-weight: bold;
        flex: 1;
        text-align: center;
        line-height: 40px;
        font-size: 16px;

        &:after {
          content: " ";
          display: block;
          width: 40px;
          height: 3px;
          background: #fff;
          border-radius: 4px;
          overflow: hidden;
          margin: 0 auto;
        }

      }

      .active2 {
        color: #000;
        font-weight: bold;
        flex: 1;
        text-align: center;
        line-height: 40px;
        font-size: 16px;

        &:after {
          content: " ";
          display: block;
          width: 40px;
          height: 3px;
          background: yellow;
          border-radius: 4px;
          overflow: hidden;
          margin: 0 auto;
        }

      }

      .active3 {
        color: #000;
        font-weight: bold;
        flex: 1;
        text-align: center;
        line-height: 40px;
        font-size: 16px;

        &:after {
          content: " ";
          display: block;
          width: 40px;
          height: 3px;
          background: #000;
          border-radius: 4px;
          overflow: hidden;
          margin: 0 auto;
        }

      }

      .item {
        color: #fff;
        flex: 1;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
      }

      .item2 {
        color: #000;
        flex: 1;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
      }
    }

    .inpbox {
      flex: 0 0 40%;

      .inp {
        width: 90%;
        height: 60%;
        border-radius: 999px;
        background-color: rgba(255, 255, 255, 0.5);
        margin: 8px auto;
        color: #fff;
        font-size: 13px;
        text-align: center;
        line-height: 24px;
      }
    }
  }

  .body {
    width: 100%;

    .swipe {
      width: 100%;

      .s-item {
        width: 100%;

        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
