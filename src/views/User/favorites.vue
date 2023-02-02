<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from 'vue-router'
import { showConfirmDialog } from 'vant';
const route = useRoute()
const router = useRouter()
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
interface t_type {
    id: number
    name: string
    img: string
    tags: Array<string>
    description: string
}
const list = ref<t_type[]>([])
const favorites = () => {
    let f:any = localStorage.getItem('concern')
    list.value = JSON.parse(f)
}
const deleteOne=(id:number)=>{
    list.value=list.value.filter(t=>{
        return t.id!==id
    })
    localStorage.setItem('concern', JSON.stringify(list.value));
}
const deleteAll = () => {
    showConfirmDialog({
        title: '标题',
        message:
            '如果解决方法是丑陋的，那就肯定还有更好的解决方法，只是还没有发现而已。',
    })
        .then(() => {
            list.value=[]
            localStorage.removeItem('concern')
        })
        .catch(() => {
            // on cancel
        });
}
onMounted(() => {
    favorites()
})
</script>

<template>
    <div class="favorites">
        <van-nav-bar title="收藏" left-arrow @click-left="goback">
            <template #right>
                <van-icon name="delete-o" size="18" color="#000" @click="deleteAll()"/>
            </template>
        </van-nav-bar>
        <div class="list">
            <van-swipe-cell v-for="m in list" :key="m.id">
            <van-card :title="m.name" :thumb="m.img" @click="goDetail(m.id)">
                <template #tags>
                    <p>{{m.description}}</p>
                </template>
                <template #footer>
                    <van-button size="mini" v-for="t in m.tags">{{t}}</van-button>
                </template>
            </van-card>
            <template #right>
                <van-button square text="删除" type="danger" class="delete-button" @click="deleteOne(m.id)"/>
            </template>
        </van-swipe-cell>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.list {
    width: 100%;
    .goods-card {
        margin: 0;
        background-color: white;
    }

    .delete-button {
        height: 100%;
    }
}
</style>