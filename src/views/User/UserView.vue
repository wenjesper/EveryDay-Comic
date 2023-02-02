<script setup lang="ts">
import { unknownProp } from "vant/lib/utils";
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useNightMode  } from '@/stores/Nighting'
const Store = useNightMode()
const { night } = storeToRefs(Store)
const route = useRoute()
const router = useRouter()
const goback = () => {
    router.go(-1)
}
const goHistory = () => {
    router.push({
        path: '/history',
    })
}
const gofavorites = () => {
    router.push({
        path: '/favorites',
    })
}
const gobarrage = () => {
    router.push({
        path: '/barrage',
    })
}
interface usertype {
    username: string
    Introduce: string
    uploader: [{
        content: string
    }]
    password: string
}
const user = ref<usertype>({
    username: '用户123456',
    Introduce: '木有简介，可能在世界各地游览',
    uploader: [{ content: '../../assets/imgs/w.png' }],
    password: ''
})
// const u =ref<string>()
const getuser = () => {
    if (localStorage.getItem('login')) {
        let u:any = localStorage.getItem('login')
        user.value = JSON.parse(u)
        console.log(user.value);
        // user.value.uploader[0].content = '../../assets/imgs/.png'
        // console.log(user.value.uploader[0].content);
    }
}
onMounted(() => {
    getuser()
})
// const checked = ref(false)
const gologin = ()=>{
    if(localStorage.getItem('user')){
        localStorage.removeItem('user')
    }else{
        router.push({
        path: '/login',
    })
    }
}
const btn =ref(localStorage.getItem('user')?'退出登录':'去登录')
</script>

<template>
    <div class="user">
        <div class="nav">
            <div class="back" @click="goback()">
                <!-- <van-icon name="arrow-left" size="25" color="#000" /> -->
            </div>
            <div class="name">
                用户界面
            </div>
            <div class="share">
                <van-icon name="ellipsis" size="25" color="#fff" />
            </div>
        </div>
        <div class="box">
            <div class="header">
                <div class="avatar">
                    <!-- <img :src="user.uploader[0].content" alt=""> -->
                    <img src="../../assets/imgs/w.png" alt="" v-if="user.username == '用户123456'">
                    <img src="../../assets/imgs/y.png" alt="" v-if="user.username !== '用户123456'">
                </div>
                <div class="sec">
                    <div class="name">{{ user?.username }}</div>
                    <div class="synopsis">{{ user?.Introduce }}</div>
                </div>
                <div class="footer">
                    <span>0关注</span>
                    <span>0粉丝</span>
                    <span>0获赞</span>
                </div>
            </div>
            <van-grid :column-num="3">
                <van-grid-item icon="clock-o" text="历史记录" @click="goHistory" />
                <van-grid-item icon="star-o" text="收藏" @click="gofavorites" />
                <van-grid-item icon="chat-o" text="评论" @click="gobarrage" />
                <!-- <van-grid-item icon="setting-o" text="设置" /> -->
            </van-grid>
            <div>

                <van-cell center icon="closed-eye" title="夜间模式">
                    <template #right-icon>
                        <van-switch v-model="night" size="24" />
                    </template>
                </van-cell>
                <van-cell icon="service-o" is-link title="客服" />
                <van-cell icon="vip-card-o" is-link title="会员充值" />
                <van-cell icon="shop-o" is-link title="商店" />
                <van-cell icon="add-o" is-link title="已购和上传" />
            </div>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit" @click="gologin">
                    {{btn}}
                </van-button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.user {
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
        background-color: rgba(255,255,255,0);
        z-index: 20;
        // border: 1px solid #f3f1f1;

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

    .box {
        width: 100%;

        .header {
            width: 100%;
            height: 250px;
            background: linear-gradient(to right, #f6d365 0%, #fda085 100%);
            position: relative;

            .avatar {
                width: 60px;
                height: 60px;
                border-radius: 999px;
                position: absolute;
                top: 80px;
                left: 10px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .sec {
                position: absolute;
                top: 150px;
                left: 0;
                width: 100%;
                height: 40px;
                .name{
                    font-size: 14px;
                    color: #fff;
                    padding-left: 10px;
                }
                .synopsis{
                    font-size: 14px;
                    color: #fff;
                    padding-left: 10px;
                }
            }

            .footer {
                color: #fff;
                width: 100%;
                height: 30px;
                position: absolute;
                bottom: 10px;
                left: 0;
                span{
                    font-size: 14px;
                    margin:0 10px;
                }
            }
        }

        .function {
            width: 100%;
            height: 60px;
            border-radius: 10px;
            display: flex;
            margin: 10px auto;
            text-align: center;

            .item {
                flex: 1;
                overflow: hidden;

                img {
                    width: 33px;
                    height: 33px;
                    margin-bottom: 5px;
                }

                .icon {
                    margin-bottom: 5px;
                }

                .name {
                    width: 100%;
                    height: 20px;
                    text-align: center;
                    line-height: 20px;
                    font-size: 14px;
                }
            }
        }
    }
}
</style>