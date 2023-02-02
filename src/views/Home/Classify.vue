<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { Api } from "@/api";
import type { SortTags, SortTopic } from "@/typings";
import { useRouter } from 'vue-router'
interface DTypes {
    tag_id: number
    title: string
}
const tag_id = ref(0)
const update_id = ref(1)
const topic_id = ref(1)
const tags = ref<DTypes[]>([])
const update_status = ref<SortTags[]>([])
const topic_properties = ref<SortTags[]>([{code:1,description:'推荐'},{code:2,description:'最火热'},{code:3,description:'新上架'}])
const topics = ref<SortTopic[]>([])
const sortData = async () => {
    let { data } = await Api.getSort(tag_id.value,update_id.value,topic_id.value,num.value)
    tags.value = data.data.tags
    update_status.value = data.data.update_status
    topics.value = data.data.topics
    console.log(topics.value);
    
}
const fixedName = ref()
const ctag_id = async (id: number) => {
    if (tag_id.value !== id) {
        tag_id.value = id
        await sortData()
    } else {
        return
    }
}
const cupdate_id = async (id: number) => {
    if (update_id.value !== id) {
        update_id.value = id
        await sortData()
    } else {
        return
    }
}
const ctopic_id = async (id: number) => {
    if (topic_id.value !== id) {
        topic_id.value = id
        await sortData()
    } else {
        return
    }
}

const router = useRouter();
const goDetail=(id:number)=>{
   router.push({ 
     path:'/detail',
     query:{
        id
     }
  }) 
}

onMounted(async () => {
    await sortData()
})
const num =ref(24)
const loading = ref(false);
    const finished = ref(false);

    const onLoad = async() => {
      setTimeout(() => {
        loading.value = false;
      }, 3000);
      num.value = num.value+24
      await sortData()
    };
</script>

<template>
    <div class="classify">
        <div class="content">
            <div class="tags">
                <div :class="tag_id==m.tag_id?'active':'t-item'" v-for="m in tags" :key="m.tag_id" @click="ctag_id(m.tag_id)">{{ m.title }}</div>
            </div>
            <div class="update">
                <div  :class="update_id==m.code?'active':'u-item'" v-for="m in update_status" :key="m.code" @click="cupdate_id(m.code)">{{
                        m.description
                }}</div>
            </div>
            <div class="topicTag">
                <div :class="topic_id==m.code?'active':'topicTag-item'" v-for="m in topic_properties" :key="m.code" @click="ctopic_id(m.code)">{{
                        m.description
                }}</div>
            </div>
                <van-list
                  class="list"
                  v-model:loading="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad"
                >
                <div class="box">
                    <div class="l-item" v-for="m in topics" :key="m.id" @click="goDetail(m.id)">
                    <div class="imgbox">
                        <img :src="m.vertical_image_url" alt="">
                    </div>
                    <div class="name">{{m.title}}</div>
                    <div class="likes">{{m.sub_title}}</div>
                </div>
                </div>
            </van-list>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.classify {
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background-color: #f3f1f1;
    .content {
        width: 95%;
        margin: 50px 2.5% 40px 2.5%;

        .tags {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            border-bottom: 1px solid #f3f1f1;
            background-color: #fff;

            .t-item {
                width: 14%;
                height: 20px;
                line-height: 20px;
                font-size: 14px;
                text-align: center;
                margin: 10px 0;
                color: #afafaf;
            }

            .active {
                color: #000;
                width: 14%;
                height: 20px;
                line-height: 20px;
                font-size: 14px;
                text-align: center;
                margin: 10px 0;
                font-weight: bold;

                &:after {
                    content: " ";
                    display: block;
                    width: 30px;
                    height: 3px;
                    background: yellow;
                    border-radius: 4px;
                    overflow: hidden;
                    margin: 0 auto;
                }
            }
        }

            .update {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                background-color: #fff;
                .u-item {
                    width: 14%;
                    height: 20px;
                    line-height: 20px;
                    font-size: 14px;
                    text-align: center;
                    margin: 10px 0;
                    color: #afafaf;
                }
                .active{
                    color: #000;
                    width: 14%;
                    height: 20px;
                    line-height: 20px;
                    font-size: 14px;
                    text-align: center;
                    margin: 10px 0;
                    font-weight: bold;
                }
            }

            .topicTag {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                background-color: #fff;
                .topicTag-item {
                    width: 14%;
                    height: 20px;
                    line-height: 20px;
                    font-size: 14px;
                    text-align: center;
                    margin: 10px 0;
                    color: #afafaf;
                }
                .active{
                    color: #000;
                    width: 14%;
                    height: 20px;
                    line-height: 20px;
                    line-height: 20px;
                    font-size: 14px;
                    text-align: center;
                    margin: 10px 0;
                    font-weight: bold;
                }
            }
            .list{
                width: 100%;
                .box{
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-around;
                    .l-item{
                    width: 32%;
                    height: 190px;
                    margin: 10px 0;
                    .imgbox{
                        width: 100%;
                        height: 150px;
                        border-radius: 10px;
                        overflow: hidden;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .name{
                        width: 100%;
                        height: 20px;
                        line-height: 20px;
                        font-size: 14px;
                        overflow:hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .likes{
                        width: 100%;
                        height: 20px;
                        color: #afafaf;
                        line-height: 20px;
                        font-size: 14px;
                    }
                }
                }
            }
        }

    }
</style>