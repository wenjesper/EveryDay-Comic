<script setup lang="ts">
import { onMounted, toRefs,ref } from "vue"
import type { DetailComics } from "@/typings";
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useOPenMenu  } from '@/stores/OpenMenu'
const Store = useOPenMenu()
const { showD } = storeToRefs(Store)
const showPopup = () => {
    showD.value = true;
};
const props = defineProps<{
    comics: Array<DetailComics>
    show: boolean
}>()
const router = useRouter()
const goChapter = (id: number, is_free: boolean) => {
    if (is_free == true) {
        router.push({
            path: '/Chapter',
            query: {
                id
            }
        })
    } else if(is_free == false) {
        showc.value=true
        console.log(123);   
    }
}
const showc=ref(false)
const { comics, show } = toRefs(props)
// const toggle = ()=> {
//     context.emit('update:show',true)
//     }

onMounted(() => {
    console.log(comics.value);

})
</script>

<template>
    <div class="chapters">
        <div class="items">
            <van-dialog v-model:show="showc" title="充值" show-cancel-button>
              <p style="text-align: center;">是否充值</p>
            </van-dialog>
            <div class="chaptersitem" v-for="(m, i) in comics" :key="m.id" @click="goChapter(m.id, m.is_free)">
                <div class="chapterimg">
                    <img :src="m.cover_image_url" alt="">
                    <div class="lock" v-if="(m.is_free == false)">
                        <img src="@/assets/icons/lock.svg" alt="">
                    </div>
                </div>
                <div class="chapterName">{{ m.title }}</div>
            </div>
            <div class="more" @click="showPopup()">查看更多</div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.chapters {
    width: 100%;
    height: 125px;
    overflow: auto;
    overflow-y: hidden;

    // overflow-x: visible;
    .items {
        width: 1300px;
        height: 100%;
        display: flex;

        .chaptersitem {
            height: 100%;
            width: 170px;
            margin-right: 10px;

            // background-color: black;
            .chapterimg {
                width: 100%;
                height: 100px;
                border-radius: 10px;
                overflow: hidden;
                position: relative;

                img {
                    width: 100%;
                    height: 100%;
                    z-index: -1;
                }

                .lock {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    background-color: rgba(0, 0, 0, 0.5);

                    img {
                        width: 25px;
                        height: 25px;
                        margin: 35px 0 0 75px;
                    }
                }
            }

            .chapterName {
                width: 100%;
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-size: 14px;
            }
        }

        .more {
            border-radius: 10px;
            background-color: #f3f1f1;
            width: 30px;
            height: 100px;
            writing-mode: tb-rl;
            font-size: 12px;
            color: #9d9d9d;
            text-align: center;
            padding-right: 10px;
        }
    }

}
</style>