<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { Api } from "@/api";
import type { BangDan, BangDanRanksTopics } from "@/typings";
interface rankTypes {
    rank_id: number
    title: string
}
const rank_types = ref<rankTypes[]>([{ "rank_id": 9, "title": "人气榜" }, { "rank_id": 2, "title": "新作榜" }, { "rank_id": 7, "title": "飙升榜" }, { "rank_id": 4, "title": "畅销榜" }, { "rank_id": 11, "title": "韩漫榜" }, { "rank_id": 10, "title": "日漫榜" }, { "rank_id": 6, "title": "恋爱榜" }, { "rank_id": 25, "title": "剧情榜" }, { "rank_id": 13, "title": "投稿榜" }, { "rank_id": 12, "title": "完结榜" }, { "rank_id": 28, "title": "免费榜" }, { "rank_id": 29, "title": "等免榜" }, { "rank_id": 27, "title": "月票榜" }])
const BangDanRanks = ref<BangDan[] | {}>({})
const BangDanRanksTopics = ref<BangDanRanksTopics[]>([])
const name = ref<string>()
const nexttime = ref<string>()
const title = ref<string>()
const titleimg = ref<string>()
const bangDan = async () => {
    let { data } = await Api.getBangDan(uid.value)
    name.value = data.data.rank_info.title
    nexttime.value = data.data.rank_info.next_update_date
    BangDanRanksTopics.value = data.data.rank_info.topics
    titleimg.value = data.data.rank_info.topics[0].cover_image_url
    title.value = data.data.rank_info.rank_desc
    console.log(BangDanRanksTopics.value);
}
const uid = ref(9)
const check = async (id: number) => {
    uid.value = id
    await bangDan()
}
const isFixed = ref<Boolean>(false)
const fixedName = ref()
// const handleScroll = () => {
//     let scrollTop =
//         window.pageYOffset ||
//         document.documentElement.scrollTop ||
//         document.body.scrollTop;
//     // isFixed.value =
//     //     scrollTop > fixedName.value.getBoundingClientRect().top ? true : false;
//     let o = Math.floor( scrollTop/100 )
//     console.log(o);
//     return `${o}`;
// };
onMounted(async () => {
    await bangDan()
    // window.addEventListener('scroll', handleScroll);
})
// onUnmounted(() => {
//     window.removeEventListener('scroll', handleScroll);
// });
</script>

<template>
    <div class="bangdan">
        <div class="imgbox">
            <van-image :src="titleimg" class="img">
                <template v-slot:loading>
                    <van-loading type="spinner" size="40" />
                </template>
            </van-image>
            <div class="zao">
                <div class="name">
                    <div>{{name}}</div>
                    <div>{{nexttime}}</div>
                </div>
            </div>
        </div>
        <!-- <div :class="isFixed ? 'is-fixed' : 'list'" ref="fixedName"> -->
        <div class="list">
            <div class="nav">
                <div :class="m.rank_id == uid ? 'active' : 'n-item'" v-for="(m,i) in rank_types" :key="i"
                    @click="check(m.rank_id)">
                    {{ m.title }}
                </div>
            </div>
            <div class="txt">
                <div class="title">{{ title }}</div>
                <div class="t-item" v-for="(t,i) in BangDanRanksTopics">
                    <div class="itembox" v-if="i<20">
                        <div class="imgbox">
                            <img :src="t.square_image_url?t.square_image_url:t.cover_image_url" alt="">
                        </div>
                        <div class="txt">
                            <div>{{t.title}}</div>
                            <!-- <div>{{t.description}}</div> -->
                            <div>
                                <text v-for="(k,i) in t.tags" :k="i">{{k}}</text>
                            </div>
                            <div class="footer">
                                <div>222万关注</div>
                                <div>关注</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.bangdan {
    width: 100vw;

    .imgbox {
        box-sizing: border-box;
        width: 100%;
        height: 200px;
        position: relative;

        .img {
            z-index: -1;
            width: 100%;
            height: 100%;
        }

        .zao {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.3);
            .name{
                width: 100%;
                margin-top: 50px;
                .name{
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    font-size: 20px;
                    font-weight: bold;
                    color: #fff;
                    text-align: center;
                }
            }
        }
    }

    .list {
        width: 100%;
        height: calc(100vh - 40px);
        display: flex;

        .nav {
            width: 20%;
            height: 100%;
            float: left;
            overflow: auto;
            background-color: #f5f3f3;

            // position: fixed;
            // left: 0;
            // top: 0;
            .n-item {
                width: 100%;
                height: 50px;
                font-size: 14px;
                background-color: #f5f3f3;
                line-height: 50px;
                text-align: center;
                color: #929292;
                border-bottom-right-radius: 10px;
                border-top-right-radius: 10px;
            }

            .active {
                width: 100%;
                height: 50px;
                font-size: 14px;
                line-height: 50px;
                text-align: center;
                background-color: #fff;
            }
        }

        .txt {
            float: right;
            width: 80%;
            height: 100%;
            overflow: auto;

            // background-color: pink;
            .title {
                width: 100%;
                height: 40px;
                line-height: 40px;
                font-size: 12px;
                // font-weight: bold;
                color: #B8860b;
                padding-left: 10px;
            }
            .t-item{
                width: 100%;
                .itembox{
                    width: 100%;
                    height: 120px;
                    display: flex;
                    margin-bottom: 10px;
                    .imgbox{
                        width: 30%;
                        height: 100%;
                        border-radius: 10px;
                        overflow: hidden;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
        }
    }
}
</style>