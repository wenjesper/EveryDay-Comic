<script setup lang="ts">
import { ref, onMounted, toRefs } from "vue"
import type { BottomTopic } from "@/typings";
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useChangeWork  } from '@/stores/ChangeWork'
const Store = useChangeWork()
const { book,bookid } = storeToRefs(Store)
const props = defineProps<{
    bottomTopic: Array<BottomTopic>
}>()
const router = useRouter()
const goDetail=async(id:number)=>{
   book.value=true
   bookid.value=id
   await router.push({
        path: '/bookshelf',
    })
}
const { bottomTopic } = toRefs(props)
onMounted(()=>{
    console.log(bottomTopic.value);
    
})
</script>

<template>
    <div class="bottomTopics">
        <div class="items" >
            <div class="bottomTopicsitem" v-for="m in bottomTopic" :key="m.id" @click="goDetail(m.id)">
                <div class="bottomTopicimg">
                    <img :src="(m.vertical_image_url)" alt="">
                    <div class="lock">{{m.update_time}}</div>
                </div>
                <div class="bottomTopicName">{{ m.title }}</div>
                <div class="bottomTopicTags">
                    <span v-for="(t,i) in m.tags.slice(0,2)" :key="i">{{t}}</span>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.bottomTopics {
    width: 100%;
    height: 250px;
    overflow: auto;
    overflow-y: hidden;
    // overflow-x: visible;
    .items {
        width: 3000px;
        height: 100%;
        display: flex;

        .bottomTopicsitem {
            height: 90%;
            width: 160px;
            margin-right: 10px;

            // background-color: black;
            .bottomTopicimg {
                width: 160px;
                height: 200px;
                border-radius: 10px;
                overflow: hidden;
                position: relative;
                img {
                    width: 100%;
                    height: 100%;
                    z-index: -1;
                }
                .lock{
                    width: 100%;
                    height: 30px;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    font-size: 14px;
                    color: #fff;
                    text-align: center;
                    line-height: 30px;
                    padding-right: 5px;
                    background-color: rgba(0,0,0,0.5);
                }
            }
            .bottomTopicName{
                width: 100%;
                height: 30px;
                line-height: 30px;
                text-align: start;
                font-size: 14px;
            }
            .bottomTopicTags{
                width: 100%;
                height: 20px;
                span{
                    font-size: 13px;
                    color: #afafaf;
                    margin-right: 5px;
                }
            }
        }
        .more{
            border-radius: 10px;
            background-color: #f3f1f1;
            width: 30px;
            height: 100px;
            writing-mode: tb-rl;
            font-size: 12px;
            color: #9d9d9d;
            text-align: center;
            padding-right: 10px;
            // line-height: 100px;
        }
    }

}
</style>