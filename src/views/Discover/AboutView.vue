<script setup lang="ts">
import { ref, onMounted } from "vue"
import { Api } from "@/api";
import type { DailyTopic } from "@/typings";
import { useRouter } from 'vue-router'
const dailyTopics = ref<DailyTopic[]>([])
const dailyTopics2 = ref<DailyTopic[]>([])
const weekDays = ref()
const active = ref(6);
const today = new Date().getDay()
let weeks2 = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const day = ref<string>(weeks2[today])
const all = ref<DailyTopic[]>([])

interface titleType {
  title: string
}

const onClickTab = <T extends titleType>(data: T): void => {
  day.value = data.title
  let wk = new Date().getDay()
  let weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  if (day.value == '今天') {
    day.value = weeks[wk]
  } else if (day.value == '昨天') {
    if (wk == 0) {
      day.value = weeks[6]
    } else {
      day.value = weeks[wk - 1]
    }
  } else {
    day.value = data.title
  }
  console.log(day.value);
};
const getfir = async () => {
  let { data } = await Api.getHomeData()
  dailyTopics.value = data.data.daily_topics.topics
  weekDays.value = data.data.daily_topics.week_days.reverse()
  all.value.push(...dailyTopics.value)
  console.log(all.value);
}
const getsec = async () => {
  let { data } = await Api.getUpdata()
  dailyTopics2.value = data.data.topics
  console.log(dailyTopics2.value);
  all.value.push(...dailyTopics2.value)

}
onMounted(async () => {
  if (localStorage.getItem('concern')) {
    let t: any = localStorage.getItem('concern')
    t2.value = JSON.parse(t)
    if (localStorage.getItem('concern')) {
      Ids.value = t2.value.map(l => {
        return l.id
      })
    }
  }
  getfir()
  await getsec()
  console.log(all.value);
})
//路由
const router = useRouter();
const goDetail = (id: number) => {
  router.push({
    path: '/detail',
    query: {
      id
    }
  })
}
//收藏关注
interface t_type {
  id: number
  name: string
  img: string
  tags: Array<string>
  description: string
}
const t2 = ref<t_type[]>([])
const Ids = ref<any>([])
const concern = (id: number, title: string, cover_image_url: string, tags: Array<string>, description: string) => {
  let m = [{
    id: id,
    name: title,
    img: cover_image_url,
    tags: tags,
    description: description
  }]

  if (localStorage.getItem('concern')) {
    if (Ids.value.indexOf(id) == -1) {
      let k = [...t2.value, ...m]
      localStorage.setItem('concern', JSON.stringify(k));
    } else {
      let news = t2.value.filter(l => {
        return l.id !== id
      })
      // console.log(news);
      localStorage.setItem('concern', JSON.stringify(news));
    }
  } else {
    localStorage.setItem('concern', JSON.stringify(m));
  }
  let t: any = localStorage.getItem('concern')
    t2.value = JSON.parse(t)
    Ids.value = t2.value.map(l => {
      return l.id
    })

}
</script>

<template>
  <div class="undata">
    <div class="nav" style="position: fixed; top:0;left:0;">
      <van-tabs v-model:active="active" swipeable @click-tab="onClickTab">
        <van-tab v-for="index in weekDays" :title="index" class="tab">
          <div class="list" style="overflow: auto;height: 100vh;">
            <div class="l-item" v-for="(m, i) in all" :key="i">
              <div v-if="m.update_remind.indexOf(day) !== -1 || m.update_remind.indexOf('不定期更新') !== -1"
                @click="goDetail(m.id)">
                <div class="imgbox">
                  <div class="sort">
                    <span>{{ m.likes_count }}</span>
                    <div class="btn" @click.stop="concern(m.id, m.title, m.vertical_image_url, m.tags, m.description)">
                      <img src="@/assets/icons/sort1.svg" alt="" v-if="Ids.indexOf(m.id)==-1">
                      <img src="@/assets/icons/sort2.svg" alt="" v-if="Ids.indexOf(m.id)!==-1">
                    </div>
                  </div>
                  <img :src="m.cover_image_url" alt="">
                  <div class="avatar">
                    <div class="aimg">
                      <img :src="m.user.avatar" alt="">
                    </div>
                    <div class="anm">{{ m.user.nickname }}</div>
                  </div>
                </div>
                <div class="news">
                  <div class="nm">{{ m.title }}</div>
                  <div class="tags">
                    <span v-for="(t, index) in m.tags" :key="index">{{ t }}</span>
                    <span>{{ m.signing_status }}</span>
                  </div>
                  <div class="goDirectory">查看全集></div>
                </div>
              </div>
            </div>
            <div style="width:100%;height:120px;"></div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.undata {
  width: 100vw;
  height: 100vh;
  overflow: auto;

  .nav {
    width: 100%;

    .list {
      width: 95%;
      margin: 0 auto;

      .l-item {
        width: 100%;
        margin: 10px 0;

        .imgbox {
          width: 100%;
          height: 200px;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid #f3f1f1;
          position: relative;

          .sort {
            position: absolute;
            right: 10px;
            top: 10px;
            width: 100px;
            height: 40px;
            display: flex;
            border-radius: 10px;
            background-color: rgba(0, 0, 0, 0.5);

            span {
              flex: 0 0 60%;
              text-align: center;
              line-height: 40px;
              color: #fff;
              font-size: 14px;
              font-weight: bold;
            }

            .btn {
              flex: 0 0 40%;

              img {
                width: 25px;
                height: 25px;
                margin: 7.5px;
              }
            }
          }

          img {
            width: 100%;
            height: 100%;
          }

          .avatar {
            position: absolute;
            left: 0;
            bottom: 0;
            z-index: 5;
            width: 100%;
            height: 30px;
            display: flex;
            background-color: rgba(0, 0, 0, 0.5);

            .aimg {
              margin: 0 0 20px 10px;
              width: 25px;
              height: 25px;
              border-radius: 999px;
              overflow: hidden;

              img {
                width: 100%;
                height: 100%;
              }
            }

            .anm {
              padding-left: 10px;
              color: #fff;
              height: 30px;
              line-height: 30px;
              font-size: 14px;
            }
          }
        }

        .news {
          width: 100%;
          height: 30px;
          display: flex;

          .nm {
            height: 30px;
            font-size: 13px;
            line-height: 30px;
            margin: 0 10px 0 0;
          }

          .tags {
            flex: 1;
            padding-top: 5px;
            overflow: auto;

            span {
              padding: 3px 5px;
              width: 50px;
              height: 25px;
              color: #fff;
              background-color: orange;
              font-size: 12px;
              align-items: center;
              border-radius: 6px;
              margin-right: 2px;
            }
          }

          .goDirectory {
            float: right;
            height: 30px;
            line-height: 30px;
            font-size: 12px;
            color: #afafaf;
          }
        }
      }
    }
  }
}
</style>
