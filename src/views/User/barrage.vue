<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from 'vue-router'
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
</script>

<template>
    <div class="barrage">
        <van-nav-bar title="标题" left-arrow @click-left="goback">
            <template #right>
                <van-icon name="search" size="18" />
            </template>
        </van-nav-bar>
        <div class="list">
            <van-swipe-cell @click="">
                <van-card desc="描述信息" title="商品标题" class="goods-card"
                    thumb="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                <template #right>
                    <van-button square text="删除" type="danger" class="delete-button" />
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