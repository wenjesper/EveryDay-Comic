<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from 'vue-router'
import { showConfirmDialog } from 'vant';
const route = useRoute()
const router = useRouter()
const goChapter = (id: number) => {
    router.push({
        path: '/Chapter',
        query: {
            id
        }
    })
}
const goback = () => {
    router.go(-1)
}
interface h_type {
    bigId: number
    id: number
    name: string
    img: string
}
const list = ref<h_type[]>([])
const historys = () => {
    let f:any = localStorage.getItem('history')
    list.value = JSON.parse(f)
}
const deleteOne = (id: number) => {
    list.value = list.value.filter(t => {
        return t.bigId != id
    })
    localStorage.setItem('history', JSON.stringify(list.value));
}
const deleteAll = () => {
    showConfirmDialog({
        title: '标题',
        message:
            '如果解决方法是丑陋的，那就肯定还有更好的解决方法，只是还没有发现而已。',
    })
        .then(() => {
            list.value=[]
            localStorage.removeItem('history')
        })
        .catch(() => {
            // on cancel
        });
}
onMounted(() => {
    historys()
})
</script>

<template>
    <div class="history">
        <van-nav-bar title="历史" left-arrow @click-left="goback">
            <template #right>
                <van-icon name="delete-o" size="18" color="#000"  @click="deleteAll()"/>
            </template>
        </van-nav-bar>
        <van-grid :column-num="3" class="list">
            <van-grid-item v-for="m in list" :key="m.id" class="l-item">
                <van-image :src="m.img" />
                <p>{{ m.name }}</p>
                <van-icon name="cross" class="delone" @click="deleteOne(m.bigId)" />
            </van-grid-item>
        </van-grid>
    </div>
</template>

<style lang="scss" scoped>
.list {
    width: 100%;

    .l-item {
        position: relative;

        .delone {
            position: absolute;
            top: 0;
            right: 0;
        }
    }
}
</style>