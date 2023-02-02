<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { Api } from "@/api";
import type { hit, str } from "@/typings";
import { useRouter } from 'vue-router'
const txt = ref()
interface his{
    txt:unknown
}
const historys =ref<his[]>([])
const outcome = ref<hit[]>([])
const obscure = ref<str[]>([])
const sou = async () => {
    console.log(txt.value);
    if (txt.value !== '') {
        if(localStorage.getItem('search')){
            let h = [{
                txt:txt.value
            }]
            historys.value=[...historys.value,...h]
            localStorage.setItem('search',JSON.stringify(historys.value))
        }else{
            let h = [{
                txt:txt.value
            }]
            localStorage.setItem('search',JSON.stringify(h))
        }
        obscure.value = []
        let { data } = await Api.getSearch(txt.value)
        outcome.value = data.data.hit
    }
}
const change = async (title: any) => {
    txt.value = title
    await sou()
}
const sou2 = async () => {
    console.log(txt.value);
    if (txt.value !== '') {
        outcome.value = []
        let { data } = await Api.getSearchM(txt.value)
        obscure.value = data.data.info
        console.log(obscure.value);

    }
}
const router = useRouter();
const goDetail = (id: number) => {
    router.push({
        path: '/detail',
        query: {
            id
        }
    })
}
const goback = () => {
    router.go(-1)
}
const del =()=>{
    txt.value=''
}
onMounted(() => {
    if(localStorage.getItem('search')){
        let t:any =localStorage.getItem('search')
        historys.value=JSON.parse(t)
    }
})
</script>

<template>
    <div class="searchview">
        <van-nav-bar title="搜索"  left-arrow @click-left="goback" />
        <div class="search">
            <div class="inpbox">
                <div style="width: 10%; height: 100%;"><van-icon name="search" size="20" color="orange"
                        style="margin: 2.5px 5px;" /></div>
                <input type="text" placeholder="请输入作品名" v-model.trim="txt" @keyup.enter.native="sou()" @input="sou2()">
            </div>
            <div class="btn" @click="del()">取消</div>
        </div>
        <div class="content">
            <div class="history" v-show="txt == ''">
                <div class="title">
                    历史记录
                    <span><van-icon name="delete-o" /></span>
                </div>
                <div class="h-box">
                    <span v-for="(m,i) in historys" :key="i" @click="change(m.txt)">{{m.txt}}</span>
                </div>
            </div>
            <div class="obscureList" v-if="txt!==''">
                <div class="ob-item" v-for="m in outcome" :key="m.id" @click="goDetail(m.id)">
                    <div class="left">
                        <img :src="m.vertical_image_url" alt="">
                    </div>
                    <div class="between">
                        <div class="name">{{ m.title }}</div>
                        <div class="user">{{ m.user.nickname }}</div>
                        <div class="tags"><span v-for="t in m.category">{{ t }}</span></div>
                        <div class="footer">
                            <span><van-icon name="chat-o"
                                    color="#afafaf" />{{ Math.floor(m.comments_count / 10000) }}万+</span>
                            <span><van-icon name="good-job-o"
                                    color="#afafaf" />{{ Math.floor(m.likes_count / 10000) }}万+</span>
                        </div>
                    </div>
                    <div class="right"></div>
                </div>
            </div>
            <div class="outcomelist" v-if="txt">
                <div class="ou-item" v-for="t in obscure" @click="change(t.title)">
                    {{ t.title }}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.searchview {
    width: 100vw;
    height: 100vh;
    overflow: auto;

    .nav {
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #f3f1f1;

        .return {
            width: 40px;
            height: 40px;
        }
    }

    .search {
        width: 100%;
        height: 40px;
        display: flex;

        .inpbox {
            width: 80%;
            height: 25px;
            display: flex;
            border-radius: 999px;
            border: 1px solid #000;
            margin: 7px 2.5%;
            overflow: hidden;

            input {
                width: 90%;
                height: 100%;
                border: none;
                outline: none;
            }
        }

        .btn {
            width: 15%;
            height: 100%;
            line-height: 40px;
            text-align: center;
        }
    }

    .content {
        width: 95%;
        margin: 20px 2.5%;

        .history {
            width: 100%;

            .title {
                width: 100%;
                height: 40px;
                line-height: 40px;

                span {
                    height: 100%;
                    float: right;
                }
            }

            .h-box {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                span{
                    padding: 2px 10px;
                    border-radius: 999px;
                    margin: 0 0 10px 10px;
                    background-color: #afafaf;
                    color: #fff;
                    font-size: 14px;
                }
            }
        }

        .obscureList {
            width: 100%;

            .ob-item {
                width: 100%;
                height: 120px;
                display: flex;
                margin: 10px 0;

                .left {
                    flex: 0 0 25%;
                    border-radius: 10px;
                    overflow: hidden;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .between {
                    width: 85%;
                    height: 100%;
                    padding-left: 10px;

                    .name {
                        width: 100%;
                        height: 30px;
                        line-height: 30px;
                        font-size: 16px;
                        font-weight: bold;
                        margin-bottom: 10px;
                    }

                    .user {
                        width: 50%;
                        height: 20px;
                        line-height: 20px;
                        color: #afafaf;
                        font-size: 14px;
                        margin-bottom: 6px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    .tags {
                        width: 100%;
                        height: 20px;
                        margin-bottom: 6px;
                        color: #afafaf;

                        span {
                            font-size: 14px;
                            margin-right: 10px;
                        }
                    }

                    .footer {
                        width: 100%;
                        height: 20px;

                        span {
                            margin-right: 10px;
                            color: #afafaf;
                        }
                    }
                }
            }
        }

        .outcomelist {
            width: 100%;

            .ou-item {
                width: 100%;
                height: 30px;
                border-bottom: 1px solid #f3f1f1;
                line-height: 30px;
                font-size: 14px;
            }
        }
    }
}
</style>