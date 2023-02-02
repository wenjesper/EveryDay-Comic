<script lang="ts" setup>
import { ref, onMounted } from "vue"
import { Api } from "@/api";
import { useRoute, useRouter } from 'vue-router'
import type { DetailTopicInfo, DetailComics, BottomTopic } from "@/typings";
import Detailchapter from '../../components/Detail/Detailchapter.vue'
import bTopic from '../../components/Detail/BottomRecommend.vue'
import Menu from '../../components/Detail/Menu.vue'
import { storeToRefs } from 'pinia';
import { useChangeWork } from '@/stores/ChangeWork'
import { useOPenMenu } from '@/stores/OpenMenu'
const Store = useChangeWork()
const Store2= useOPenMenu()
const { book,bookid } = storeToRefs(Store)
const { showD } = storeToRefs(Store2)
const route = useRoute()
const router = useRouter()
const goback = () => {
    router.go(-1)
}
const id = route.query.id as string
const title = ref('')//开始章节名字
const titleId = ref(0)//开始章节名字
const Comics = ref<DetailComics[]>([])//章节
const ComicsShow = ref<DetailComics[]>([])//截取Comics
const zhan = ref(false)//展开
const TopicInfo = ref<DetailTopicInfo>()
const bottomTopic = ref<BottomTopic[]>([])
const kai = () => {
    zhan.value = true
}

const detail = async () => {
    let { data } = await Api.getDetail(id)
    TopicInfo.value = data.data.topic_info
    Comics.value = data.data.topic_info.comics
    ComicsShow.value = data.data.topic_info.comics.slice(0, 7)
    title.value = data.data.topic_info.comics[0].title
    titleId.value = data.data.topic_info.comics[0].id
    bottomTopic.value = data.data.bottom_recommend.topic_list
    console.log(data);
}
const detail2 = async () => {
    let { data } = await Api.getDetail(bookid.value)
    TopicInfo.value = data.data.topic_info
    Comics.value = data.data.topic_info.comics
    ComicsShow.value = data.data.topic_info.comics.slice(0, 7)
    title.value = data.data.topic_info.comics[0].title
    bottomTopic.value = data.data.bottom_recommend.topic_list
    console.log(data);
}

const showPopup = () => {
    showD.value = true;
};
onMounted(() => {
    detail()
    if (localStorage.getItem('concern')) {
        let t: any = localStorage.getItem('concern')
        t2.value = JSON.parse(t)
        Ids.value = t2.value.map(l => {
            return l.id
        })
        console.log(Ids.value.indexOf(TopicInfo.value?.id));
        
    }
    if (localStorage.getItem('history')) {
        let h: any = localStorage.getItem('history')
        h2.value = JSON.parse(h)
        bigIds.value = h2.value.map(l => {
            return l.bigId
        })
        let n = bigIds.value.indexOf(JSON.parse(id))
        console.log(n);
        console.log(h2.value);
        if(n!==-1){
            ind.value=h2.value[n]
        }else{

        }
    }
    
})
//关注收藏
interface t_type {
    id: number
    name: string
    img: string
    tags: Array<string>
    description: string
}
const t2 = ref<t_type[]>([])
const Ids = ref<any>([])
const concern = () => {
    let m = [{
        id: TopicInfo.value?.id,
        name: TopicInfo.value?.title,
        img: TopicInfo.value?.vertical_image_url,
        tags: TopicInfo.value?.tags,
        description: TopicInfo.value?.description
    }]
    if (localStorage.getItem('concern')) {
        let t: any = localStorage.getItem('concern')
        t2.value = JSON.parse(t)
        Ids.value = t2.value.map(l => {
            return l.id
        })

        if (Ids.value.indexOf(TopicInfo.value?.id) == -1) {
            let k = [...t2.value, ...m]
            localStorage.setItem('concern', JSON.stringify(k));
        } else {
            let news = t2.value.filter(l => {
                return l.id !== TopicInfo.value?.id
            })
            console.log(news);
            localStorage.setItem('concern', JSON.stringify(news));
        }
    } else {
        localStorage.setItem('concern', JSON.stringify(m));
    }
}
//获取是否有历史记录
interface h_type {
    bigId: number
    id: number
    name: string
    img: string
}
const h2=ref<h_type[]>([])
const bigIds=ref<any>([])
interface i{
    bigId:number
    id:number
    img:string
    name: string
}
const ind = ref<any>({bigId:'',id:'',img:'',name: ''})
const go=(id:number)=>{
    router.push({
            path: '/Chapter',
            query: {
                id
            }
        })
}
</script>

<template>
    <div class="detail" v-if="TopicInfo">
        <div class="nav">
            <div class="back" @click="goback()">
                <van-icon name="arrow-left" size="25" color="#000" />
            </div>
            <div class="name">
                {{ TopicInfo?.title }}
            </div>
            <div class="share">
                <van-icon name="ellipsis" size="25" color="#000" />
            </div>
        </div>
        <div class="imgbox">
            <img :src="TopicInfo?.cover_image_url" alt="">
            <div class="statistics">
                <div class="left">
                    <div class="l-tit">{{ TopicInfo?.title }}</div>
                    <div class="data">
                        <span>{{ TopicInfo?.popularity_info }}人气</span>
                        <span>{{ TopicInfo?.comments_count }}评论</span>
                        <span>{{ TopicInfo?.fav_count }}关注</span>
                    </div>
                </div>
                <div class="right">
                    <div :class="(Ids.indexOf(TopicInfo.id)==-1) ? 'concern' : 'active'" @click="concern()">{{ Ids.indexOf(TopicInfo.id)==-1 ? '关注' : '已关注' }}
                    </div>
                </div>
            </div>
        </div>
        <div class="list">
            <div class="tags">
                <div class="t-item" v-for="(m, i) in TopicInfo?.tags" :key="i">{{ m }}</div>
            </div>
            <div :class="zhan ? 'zhan' : 'profile'">
                <p v-html="TopicInfo?.description"></p>
                <div class="open" @click="kai()" v-if="!zhan">展开<van-icon name="arrow-down" size="10" /></div>
            </div>
            <div class="author-box">
                <div class="author">
                    <img src="" alt="">
                    <span class="aname"></span>
                </div>
            </div>
            <div class="chapterbox">
                <div class="c-tit">
                    <div class="t-left">
                        <div class="c-title">漫画选集</div>
                        <div class="c-title" style="font-size: 14px; color:#afafaf;">已更{{ TopicInfo?.comics_count }}话
                        </div>
                    </div>
                    <div class="t-right">
                        <span @click="showPopup()">展开选集></span>
                    </div>
                </div>
                <Detailchapter :comics="ComicsShow" v-model:show="showD"></Detailchapter>
                <van-popup v-model:show="showD" round position="bottom" :style="{ height: '70%' }">
                    <Menu 
                    :comics="Comics"
                    :bigId="TopicInfo.id"
                    ></Menu>
                </van-popup>
            </div>
            <div class="updata">
                <div class="u-title">最近更新</div>
                <bTopic :bottomTopic="bottomTopic"></bTopic>
            </div>
            <div class="footer">
                <div class="readed">已读到：{{ ind.name!==''?ind.name:title }}</div>
                <div class="go" @click="go(ind.id!=''?ind.id:titleId)">开始阅读</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.detail {
    width: 100vw;
    height: 100vh;
    overflow: auto;
    overflow-x: hidden;

    .nav {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 40px;
        display: flex;
        background-color: #fff;
        z-index: 20;

        .back {
            flex: 0 0 10%;
            padding-top: 7.5px;
        }

        .name {
            flex: 0 0 80%;
            color: #000;
            font-size: 14px;
            // font-weight: bold;
            line-height: 40px;
            text-align: center;
        }

        .share {
            flex: 0 0 10%;
            padding-top: 7.5px;
        }
    }

    .imgbox {
        margin-top: 40px;
        width: 100%;
        height: 245px;
        background-image: url("@/assets/imgs/bg.png");
        position: relative;

        img {
            width: 100%;
            height: 100%;
            z-index: -1;
        }

        .statistics {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            display: flex;
            background-color: rgba(0, 0, 0, 0.4);

            .left {
                width: 70%;

                .l-tit {
                    padding-left: 10px;
                    height: 40px;
                    line-height: 40px;
                    color: #fff;
                    font-size: 16px;
                }

                .data {
                    padding-left: 10px;
                    height: 30px;
                    display: flex;

                    span {
                        flex: 1;
                        line-height: 30px;
                        font-size: 14px;
                        color: #fff;
                        text-align: center;
                    }
                }
            }

            .right {
                flex: 0 0 30%;

                .concern {
                    margin: 10px auto;
                    border-radius: 999px;
                    background-color: yellow;
                    color: #000;
                    height: 25px;
                    width: 50px;
                    font-size: 14px;
                    line-height: 25px;
                    text-align: center;
                }

                .active {
                    margin: 10px auto;
                    border-radius: 999px;
                    background-color: #f3f1f1;
                    color: #fff;
                    height: 25px;
                    width: 50px;
                    font-size: 14px;
                    line-height: 25px;
                    text-align: center;
                }
            }
        }
    }

    .list {
        width: 95%;
        margin: 10px 2.5% 50px 2.5%;

        .tags {
            width: 100%;
            display: flex;

            .t-item {
                padding: 2px 5px;
                background-color: #f3f1f1;
                font-size: 14px;
                border-radius: 999px;
                // width: 30px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                margin: 5px 0 5px 10px;
            }
        }

        .zhan {
            width: 100%;
            font-size: 14px;
            position: relative;
        }

        .profile {
            width: 100%;
            height: 50px;
            font-size: 14px;
            overflow: hidden;
            position: relative;

            .open {
                position: absolute;
                z-index: 20;
                right: 0;
                width: 50px;
                height: 20px;
                top: 34px;
                line-height: 20px;
                background-color: #fff;
                color: #afafaf;
                border-left: 10px solid rgba(255, 255, 255, 0.2);
            }
        }

        .chapterbox {
            width: 100%;
            margin: 20px 0;

            .c-tit {
                width: 100%;
                height: 50px;
                display: flex;

                .t-left {
                    flex: 0 0 70%;

                    .c-title {
                        width: 100%;
                        height: 25px;
                        font-size: 16px;
                        line-height: 25px;
                    }

                }

                .t-right {
                    flex: 0 0 30%;
                    overflow: hidden;

                    span {
                        color: #afafaf;
                        font-size: 14px;
                        float: right;
                        margin-top: 15px;
                    }
                }
            }
        }

        .updata {
            width: 100%;
            margin: 20px 0;

            .u-title {
                width: 100%;
                height: 40px;
                line-height: 40px;
                font-weight: 16px;
                text-align: start;
            }
        }

        .footer {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 40px;
            display: flex;
            border: 1px solid #f3f1f1;
            background-color: #fff;

            .readed {
                flex: 0 0 60%;
                line-height: 40px;
                font-size: 14px;
                color: #afafaf;
                padding-left: 10px;
            }

            .go {
                background-color: yellow;
                flex: 0 0 40%;
                line-height: 40px;
                font-size: 16px;
                text-align: center;
            }
        }
    }
}
</style>