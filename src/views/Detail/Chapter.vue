<script lang="ts" setup>
import { ref, onMounted,onUnmounted } from "vue"
import { Api } from "@/api";
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant'
import 'vant/es/toast/style';
import type { ChapterComicInfo, DetailComics, ChapterRecommendTopics } from "@/typings";
// import Dir from '../../components/Detail/Directory.vue'
import Menu from '../../components/Detail/Menu.vue'
import { storeToRefs } from 'pinia';
import { useChangeWork  } from '@/stores/ChangeWork'
const Store = useChangeWork()
const { menu,menuid } = storeToRefs(Store)
const route = useRoute()
const router = useRouter()
const goback = () => {
    router.go(-1)
}
// 回到详情页
const detailId = ref()
const goDetail = (id: number) => {
    router.push({
        path: '/detail',
        query: {
            id
        }
    })
}
const comicinfo = ref<ChapterComicInfo>()
const Comics = ref<DetailComics[]>([])
interface next {
    id: number
    likes_count_number: number
    locked_code: number
}
const next_comic_info = ref<next>() //下一章
const previous_comic_info = ref<next>() //上一章
const id: unknown = route.query.id as unknown
const gonext = async () => {
    let none: any = []
    comicinfo.value = none
    showToast({
        message: '加载中...',
        forbidClick: true,
    });
    await getchapter2()
    await getHistory()
}
const goprevious = async () => {
    console.log(previous_comic_info.value?.id);
    if (previous_comic_info.value !== null) {
        let none: any = []
        comicinfo.value = none
        showToast({
            message: '加载中...',
            forbidClick: true,
        });
        await getchapter3()
        await getHistory()
    } else {
        return
    }
}
const getchapter = async () => {
    let { data } = await Api.getChapter(id)
    comicinfo.value = data.data.comic_info
    next_comic_info.value = data.data.next_comic_info
    previous_comic_info.value = data.data.previous_comic_info
    Comics.value = data.data.topic_info.comics.reverse()
    detailId.value = data.data.topic_info.id
    console.log(data);
    await getHistory()
}
const getchapter2 = async () => {
    let { data } = await Api.getChapter(next_comic_info.value?.id)
    comicinfo.value = data.data.comic_info
    next_comic_info.value = data.data.next_comic_info
    previous_comic_info.value = data.data.previous_comic_info
    Comics.value = data.data.topic_info.comics
    console.log(data, 4321);
}
const getchapter3 = async () => {
    let { data } = await Api.getChapter(previous_comic_info.value?.id)
    comicinfo.value = data.data.comic_info
    next_comic_info.value = data.data.next_comic_info
    previous_comic_info.value = data.data.previous_comic_info
    Comics.value = data.data.topic_info.comics
    console.log(data, 4321);
}
const onSelect = (option: any) => {
    showToast(option.name);
    showShare.value = false
    // console.log(showShare.value);

};
const options = [
    [
        { name: '微信', icon: 'wechat' },
        { name: '朋友圈', icon: 'wechat-moments' },
        { name: '微博', icon: 'weibo' },
        { name: 'QQ', icon: 'qq' },
    ],
    [
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
        { name: '小程序码', icon: 'weapp-qrcode' },
    ],
];
//弹出
const showShare = ref(false);
const showA = ref(false)
const showD = ref(false)
const showC = ref(false)
const showS = ref(false)
const checked1 = ref(false);
const checked2 = ref(false);
const checked3 = ref(false);
const showAA = () => {
    showA.value = !showA.value;
    console.log(myRef.value.offsetHeight,123)
    console.log(myRef.value.getBoundingClientRect().top)
};
const showDirectory = () => {
    showD.value = !showD.value;
};
const showChat = () => {
    showC.value = !showC.value;
};
const showSetting = () => {
    showS.value = !showS.value;
};
const share = () => {
    showShare.value = !showShare.value
}
const value = ref('');
const onClickButton = () => {

}
//refs
const myRef = ref();
const t = ref(0)
const rise = ref()
const over = ref('overflow: hidden')
const over2 = ref('overflow: auto')
const gorise = () => {
    if(myRef.value.getBoundingClientRect().top>(-myRef.value.offsetHeight)){
        return
    }else{
        t.value = t.value - 400
        rise.value = `transform:translateY(${t.value}px)`
    }
}
const godecline = () => {
    if(myRef.value.getBoundingClientRect().top>-400){
        return
    }
    else{
        t.value = t.value + 400
        rise.value = `transform:translateY(${t.value}px)`
    }
}
//获取历史
interface t_type{
    bigId:number
    id:number
    name:string
    img:string
    // tags:Array<string>
    // description:string
}
const t2 =ref<t_type[]>([])
const t4 =ref<t_type[]>([])
const getHistory=()=>{
  let m =[{
        bigId:detailId.value,
        id:comicinfo.value?.id,
        name:comicinfo.value?.title,
        img:comicinfo.value?.cover_image_url,
    }]
    let t:any =localStorage.getItem('history')
    t2.value=JSON.parse(t)
    let t3:any =localStorage.getItem('historys')
    t4.value=JSON.parse(t3)
    if(localStorage.getItem('history')){
        let bigIds = t2.value.map(l=>{
            return l.bigId
        })
        if(bigIds.indexOf(detailId.value)==-1){
            let k =[...t2.value,...m]
            localStorage.setItem('history', JSON.stringify(k));
        }else{
            let news = t2.value.filter(l=>{
                return l.bigId!==detailId.value
            })
            let k =[...news,...m]
            localStorage.setItem('history', JSON.stringify(k));
            console.log(news);
        }
    }else{
        localStorage.setItem('history', JSON.stringify(m));
        localStorage.setItem('historys', JSON.stringify(m));
    }
    if(localStorage.getItem('historys')){
        let Ids:any = t4.value.map(l=>{
            return l.id
        })
        if(Ids.indexOf(comicinfo.value?.id)==-1){
            localStorage.setItem('historys', JSON.stringify([...t4.value,...m]));
        }else{
            return
        }  
    }else{
        localStorage.setItem('historys', JSON.stringify(m));
    }
    }
onMounted(async() => {
    console.log(id);
    getchapter()
})
</script>

<template>
    <div class="chapter">
        <div class="zao" v-if="checked2 == true"></div>
        <div class="nav" v-if="showA">
            <div class="back" @click="goback()">
                <van-icon name="arrow-left" size="25" color="#000" />
            </div>
            <div class="name">
                {{ comicinfo?.title }}
            </div>
            <div class="godetail" @click="goDetail(detailId)">
                <span>详</span>
            </div>
            <div class="share" @click="share()">
                <van-icon name="ellipsis" size="25" color="#000" />
                <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" @select="onSelect"
                    :overlay="false" />
                <!-- <van-popup v-model:show="showShare" round position="bottom" :style="{ height: '30%' }" :overlay="false" title="立即分享给好友"/> -->
            </div>
        </div>
        <div class="content" :style="checked1 == true ? over : over2" @click="showAA()">
            <div class="rise" @click.stop="gorise" v-if="checked1 == true"></div>
            <div class="decline" @click.stop="godecline" v-if="checked1 == true"></div>
            <div class="list" ref="myRef" :style="rise">
                <div class="l-item" v-for="m in comicinfo?.comic_images">
                    <img :src="m.url" alt="">
                </div>
            </div>
        </div>
        <div class="footer" v-if="showA">
            <div class="function">
                <div class="directory">
                    <div @click="goprevious()">
                        <van-icon name="arrow-left" v-if="previous_comic_info !== null" />
                        <van-icon name="arrow-left" color="#afafaf" v-if="previous_comic_info == null" />
                    </div>
                    <div style="width: 50px;height: 100%;" @click="showDirectory">目录</div>
                    <div @click="gonext()"><van-icon name="arrow" /></div>
                </div>
                <div class="f-right">
                    <div @click="showChat()"><van-icon name="chat-o" badge="9" size="25" /></div>
                    <div @click="showSetting()"><van-icon name="setting-o" size="25" /></div>
                </div>
            </div>
        </div>
        <div class="popup">
            <van-popup v-model:show="showD" z-index="10" round position="bottom" :style="{ height: '70%' }">
                <Menu 
                :comics="Comics"
                :bigId="detailId"
                ></Menu>
            </van-popup>
            <van-popup v-model:show="showC" z-index="10" round position="bottom" :style="{ height: '70%' }">
                <van-search v-model="value" show-action label="弹幕" placeholder="请输入搜索关键词" shape="round">
                    <template #action>
                        <div @click="onClickButton">发射</div>
                    </template>
                </van-search>
            </van-popup>
            <van-popup v-model:show="showS" z-index="10" round position="bottom" :style="{ height: '40%' }">
                <van-cell title="翻页模式" value="只支持上下翻页" />
                <van-cell center title="翻页模式">
                    <template #right-icon>
                        <van-switch v-model="checked1" size="24" />
                    </template>
                </van-cell>
                <van-cell center title="夜间模式">
                    <template #right-icon>
                        <van-switch v-model="checked2" size="24" />
                    </template>
                </van-cell>
                <van-cell center title="弹幕自动播放">
                    <template #right-icon>
                        <van-switch v-model="checked3" size="24" />
                    </template>
                </van-cell>
            </van-popup>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.chapter {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    scroll-behavior: smooth;
    // overflow-x: hidden;
    .zao {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
        pointer-events: none;
        z-index: 100;
    }

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
            flex: 0 0 70%;
            color: #000;
            font-size: 16px;
            // font-weight: bold;
            line-height: 40px;
        }

        .godetail {
            flex: 0 0 10%;
            padding-top: 7px;

            span {
                padding: 2px;
                border-radius: 999px;
                border: 3px solid #000;
                text-align: center;
                line-height: 30px;
                font-size: 13px;
                font-weight: bold;
            }
        }

        .share {
            flex: 0 0 10%;
            padding-top: 7.5px;
        }
    }

    .content {
        width: 100%;
        height: 100vh;
        overflow: auto;

        .rise {
            width: 100%;
            height: 150px;
            position: fixed;
            top: 0px;
            left: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 10;
        }

        .decline {
            width: 100%;
            height: 150px;
            position: fixed;
            bottom: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 10;
        }

        .list {
            width: 100%;

            .l-item {
                width: 100%;
                margin: 0;
                padding: 0;
                font-size: 0;
                border: none;
                outline: none;
                background-image: url("@/assets/imgs/bg.png");
                background-size: cover;

                img {
                    width: 100%;
                }
            }
        }
    }

    .footer {
        width: 100%;
        height: 40px;
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: #fff;
        border: 1px solid #f3f1f1;
        z-index: 100;

        .function {
            width: 100%;
            height: 40px;

            .directory {
                float: left;
                width: 110px;
                height: 30px;
                margin: 5px 10px;
                background-color: #f3f1f1;
                border-radius: 999px;
                display: flex;

                div {
                    width: 30px;
                    height: 100%;
                    color: #000;
                    font-size: 14px;
                    text-align: center;
                    line-height: 30px;
                }
            }

            .f-right {
                width: 100px;
                height: 40px;
                display: flex;
                float: right;

                div {
                    width: 50px;
                    height: 100%;
                    font-size: 14px;
                    padding: 7.5px;
                }
            }
        }
    }
}
</style>