<script setup lang="ts">
import { ref, onMounted } from "vue"
import { Api } from "@/api";
import type { PopularityTopics, BannersType, CategoriesType, DiscoveryModules, RanksType, topicsType } from "@/typings";
import { useRouter } from 'vue-router'
const num = ref(7)
const change =(id:number)=>{
    num.value=id
}
const popularityTopics = ref<PopularityTopics[]>([])
const bannersType = ref<BannersType[]>([])
const categoriesType = ref<CategoriesType[]>()
const discoveryModules = ref<DiscoveryModules[]>([])
const lei = ref<topicsType[]>([])
const lei2 = ref<topicsType[]>([])
const lei3 = ref<topicsType[]>([])
const ranks = ref<RanksType[]>()
const router = useRouter()
const goChapter = (id: number) => {
  router.push({
    path: '/Chapter',
    query: {
      id
    }
  })
}
const goBangdan = () => {
  router.push({
    path: 'bangdan',
  })
}
// 换一换
const oref = ref()
const t = ref(0)
const t2 = ref(0)
const rise = ref()
const rise2 = ref()
const gorise = () => {
    if(t.value<=-585){
      t.value=0
      rise.value = `transform:translateY(${t.value}px)`
    }else{
        t.value = t.value - 195
        rise.value = `transform:translateY(${t.value}px)`
    }
}
const gorise2 = () => {
    if(t2.value<=-585){
      t2.value=0
      rise2.value = `transform:translateY(${t2.value}px)`
    }else{
        t2.value = t2.value - 195
        rise2.value = `transform:translateY(${t2.value}px)`
    }
}
onMounted(async () => {
  let { data } = await Api.getHomeData()
  popularityTopics.value = data.data.popularity_topics
  bannersType.value = data.data.banners
  categoriesType.value = data.data.categories
  lei.value = data.data.discovery_modules[0].topics
  lei2.value = data.data.discovery_modules[1].topics
  lei3.value = data.data.discovery_modules[2].topics
  ranks.value = data.data.ranks
  console.log(data);
  console.log(oref.value.offsetHeight);
  console.log(oref.value.getBoundingClientRect().top);
})
</script>

<template>
  <div class="recommend">
    <van-swipe :autoplay="3000" lazy-render class="swipe">
      <van-swipe-item v-for="(m, i) in bannersType" :key="i" class="s-item" @click="goChapter(m.target_id)">
        <img :src="m.image_url" />
      </van-swipe-item>
    </van-swipe>
    <div class="list">
      <div class="lei">
        <div class="title">这漫画令我上头！<span @click="gorise"><van-icon name="replay" />换一换</span></div>
        <div class="itembox">
          <div class="box" ref="oref" :style="rise">
            <div class="le-item" v-for="m in lei" :key="m.id" @click="goChapter(m.id)">
              <img :src="m.vertical_image_url" alt="">
              <div class="like"><van-icon name="good-job-o" />{{ m.likes_count }}</div>
              <div class="name">{{ m.title }}</div>
              <div class="tags"><span v-for="t in m.tags">{{ t }}</span></div>
            </div>
          </div>
        </div>
      </div>
      <van-divider />
      <div class="leaderboard">
        <div class="title">
          <span style="float: left;" v-for="m in ranks" :key="m.rank_id" :class="num==m.rank_id?'active':''" @click="change(m.rank_id)">{{ m.title }}</span>
          <span style="float: right;" @click="goBangdan()">更多></span>
        </div>
        <div class="leader-box" v-for="m in ranks" :key="m.rank_id">
          <div class="show" v-if="num == m.rank_id">
            <div class="b-item" v-for="(t, i) in m.topics" :key="i" @click="goChapter(t.id,)">
              <img :src="t.vertical_image_url" alt="">
              <div class="ranking"><span>{{ (i + 1) }}</span></div>
              <div class="tags"><span v-for="(k, index) in t.tags" :key="index">{{ k }}</span></div>
              <div class="name">{{ t.title }}</div>
              <div class="dui">
                <!-- <span >-</span> -->
                <span v-if="t.rank_change_value.indexOf('下降') !== -1"><van-icon name="down" /></span>
                <span style="transform: rotate(180deg);"
                  v-if="t.rank_change_value.indexOf('上升' && '黑马') !== -1"><van-icon name="down" /></span>
                {{ t.rank_change_value }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <van-divider />
      <div class="lei">
        <div class="title">眉头一皱，发现事情并不简单！<span @click="gorise2()"><van-icon name="replay" />换一换</span></div>
        <div class="itembox">
          <div class="box" :style="rise2">
            <div class="le-item" v-for="m in lei3" :key="m.id" @click="goChapter(m.id)">
              <img :src="m.vertical_image_url" alt="">
              <div class="like"><van-icon name="good-job-o" />{{ m.likes_count }}</div>
              <div class="name">{{ m.title }}</div>
              <div class="tags"><span v-for="t in m.tags">{{ t }}</span></div>
            </div>
          </div>
        </div>
      </div>
      <van-divider />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.recommend {
  width: 100vw;
  height: 100vh;
  overflow: auto;

  .swipe {
    width: 100%;

    .s-item {
      width: 100%;
      background-image: url("@/assets/imgs/bg.png");
      background-size: cover;

      img {
        width: 100%;
      }
    }
  }

  .list {
    width: 95%;
    margin: 10px 2.5% 50px 2.5%;

    .lei {
      width: 100%;
      height: 230px;

      .title {
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        font-weight: bold;
        span{
          float: right;
          font-size: 14px;
          margin-right: 10px;
        }
      }

      .itembox {
        width: 100%;
        height: 194px;
        overflow: hidden;
        // display: flex;
        // flex-wrap: wrap;
        // justify-content: space-between;

        .box {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          

          .le-item {
            width: 33%;
            height: 195px;
            position: relative;

            img {
              width: 100%;
              height: 150px;
              border-radius: 6px;
            }

            .like {
              position: absolute;
              top: 130px;
              right: 10px;
              width: 100%;
              color: #fff;
              text-align: end;
              z-index: 5;
            }
            .name{
              font-size: 14px;
            }
            .tags{
              width: 100%;
              span{
                color: #afafaf;
                font-size: 13px;
                margin-right: 10px;
              }
            }
          }
        }
      }
    }

    .leaderboard {
      width: 100%;

      .title {
        width: 100%;
        height: 30px;

        span {
          font-size: 14px;
          line-height: 30px;
          margin-right: 10px;
        }
        .active{
          line-height: 30px;
          margin-right: 10px;
          font-size: 16px;
          font-weight: bold;
        }
      }

      .leader-box {
        width: 100%;

        // display: flex;
        // flex-wrap: wrap;
        // justify-content: space-between;
        // margin: 10px 0;
        .show {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin: 10px 0;
          background-size: cover;

          .b-item {
            width: 32%;
            position: relative;
            overflow: hidden;

            img {
              width: 100%;
              height: 120px;
            }

            .name {
              width: 100%;
              height: 20px;
              line-height: 20px;
              font-size: 14px;
              overflow: hidden;
            }

            .dui {
              width: 100%;
              height: 20px;
              line-height: 20px;
              display: flex;

              span {
                display: block;
                // transform: rotate(180deg);
              }
            }

            .ranking {
              position: absolute;
              top: -5px;
              left: -5px;
              color: #fff;
              background-color: orange;
              width: 30px;
              height: 30px;
              transform-origin: bottom right;
              transform: rotate(-10deg);
              border-bottom-right-radius: 6px;

              span {
                display: block;
                transform: rotate(10deg);
                width: 100%;
                height: 100%;
                padding-left: 2px;
                text-align: center;
                line-height: 35px;
              }
            }

            .tags {
              width: 100%;
              height: 20px;
              position: absolute;
              top: 100px;
              left: 0;
              overflow: hidden;

              span {
                float: right;
                color: #fff;
                font-size: 14px;
                line-height: 20px;
                margin-left: 5px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
