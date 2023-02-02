<script lang="ts" setup>
import { onMounted, toRefs, ref } from "vue"
import type { DetailComics } from "@/typings";
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useChangeWork } from '@/stores/ChangeWork'
const Store = useChangeWork()
const { menu,menuid } = storeToRefs(Store)
const props = defineProps<{
    comics: Array<DetailComics>
    bigId:any
}>()
const router = useRouter()
const goChapter = async(id: number, is_free: boolean) => {
    if (is_free == true&&router.currentRoute.value.name!=='Chapter') {
        router.push({
            path: '/Chapter',
            query: {
                id
            }
        })
    }else if(is_free == false) {
        showc.value=true
        console.log(123);  
    }else if(router.currentRoute.value.name=='Chapter'&&is_free ==true){
        menu.value=true
        menuid.value=id
        await router.push({
            path: '/bookshelf',
        })
    }
}
const { comics,bigId} = toRefs(props)
interface h_type {
    bigId: number
    id: number
    name: string
    img: string
}
const h2=ref<h_type[]>([])
const h4=ref<h_type[]>([])
const bigIds=ref<any>([])
const Ids=ref<any>([])
const Ids2=ref<any>([])
const ind=ref()
const inde=ref()
onMounted(() => {
    console.log(comics.value);
    if (localStorage.getItem('history')) {
        let h: any = localStorage.getItem('history')
        h2.value = JSON.parse(h)
        bigIds.value = h2.value.map(l => {
            return l.bigId
        })
        Ids.value = h2.value.map(l => {
            return l.id
        })
        let n = bigIds.value.indexOf(JSON.parse(bigId.value))
        console.log(n);
        console.log(h2.value);
        if(n!==-1){
            ind.value=h2.value[n].name
            inde.value=n
        }else{
            ind.value=comics.value[0].title
            inde.value=0
            Ids.value=[comics.value[0].id]
        }
    }else{
        ind.value=h2.value
        inde.value=0
    }
    if(localStorage.getItem('historys')){
        let h3:any=localStorage.getItem('historys')
        h4.value=JSON.parse(h3)
        Ids2.value=h4.value.map(l=>{
            return l.id
        })
    }
})
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const num = ref(20)
const addnum = () => {
    num.value = num.value + 20
}
const onLoad = async () => {
    setTimeout(() => {
        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        if (comics.value.length <= num.value) {
            finished.value = true;
        }
    }, 3000);
    await addnum()
};
const checked = ref(false);
const showc=ref(false)
const sort = ()=>{
   comics.value=comics.value.reverse()
}
const color =ref('background-color:#f3f1f1')//已读颜色
</script>

<template>
    <div class="menu">
        <van-cell center>
            <template #right-icon>
                <div style="width: 88%;">
                    <span>已更{{ comics.length }}话</span>
                    <span style="width: 150px; color: #afafaf; font-size:14px;margin-left:10px;white-space: nowrap; text-overflow: ellipsis;overflow: hidden;">上次读到：{{ind}}</span>
                </div>
                <van-switch v-model="checked" size="24" @click="sort()"/>
            </template>
        </van-cell>
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-dialog v-model:show="showc" title="充值" show-cancel-button>
              <p style="text-align: center;">是否充值</p>
            </van-dialog>
            <div class="item" v-for="(m, i) in comics" :key="i" @click="goChapter(m.id,m.is_free)" :style="Ids2.indexOf(m.id)!==-1?color:''">
                <div v-if="i < num" class="box">
                    <div class="imgbox">
                        <img :src="m.cover_image_url" alt="">
                        <div class="zao" v-if="m.is_free == false">
                            <img src="@/assets/icons/lock.svg" alt="">
                        </div>
                    </div>
                    <div class="right">
                        <div>{{ m.title }}</div>
                        <div>20{{ m.created_at }}</div>
                    </div>
                    <div class="time" v-if="Ids.indexOf(m.id)!==-1"><van-icon name="underway-o" size="20" class="btn"/></div>
                </div>
            </div>
        </van-list>

    </div>
</template>

<style lang="scss" scoped>
.menu {
    width: 100%;

    .title {
        width: 100%;
        height: 40px;
        display: flex;
        font-size: 16px;
        padding-left: 20px;
        line-height: 40px;
    }

    .item {
        width: 100%;

        .box {
            width: 100%;
            height: 100px;
            display: flex;

            .imgbox {
                flex: 0 0 35%;
                position: relative;

                img {
                    width: 90%;
                    height: 80%;
                    position: absolute;
                    top: 10%;
                    left: 5%;
                    border-radius: 6px;
                }

                .zao {
                    width: 90%;
                    height: 80%;
                    position: absolute;
                    top: 10%;
                    left: 5%;
                    border-radius: 6px;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 2;
                    img {
                        width: 25px;
                        height: 25px;
                        margin: 20px 45px;
                        z-index: 3;
                    }
                }
            }

            .right {
                width: 65%;
                height: 80px;
                margin: 10px 0;
            }
            .time{
                width: 30px;
                height: 30px;
                border-bottom-left-radius: 999px;
                border-top-left-radius: 999px;
                background-color: yellow;
                margin: auto 0;
                .btn{
                    margin: 5px;
                }
            }
        }
    }
}
</style>