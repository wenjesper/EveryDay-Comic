<script setup lang="ts">
import { ref, onMounted } from "vue"
import { storeToRefs } from 'pinia';
import { useChangeWork } from '@/stores/ChangeWork'
import { useRoute, useRouter } from 'vue-router'
const Store = useChangeWork()
const { book,bookid,menu,menuid } = storeToRefs(Store)
const router = useRouter()
const goDetail = () => {
    router.push({
        path: '/detail',
        query: {
            id:bookid.value
        }
    })
    book.value=false
}
const goChapter = () => {
    router.push({
            path: '/Chapter',
            query: {
                id:menuid.value
            }
        })
    menu.value=false
}
onMounted(()=>{
    if(book.value==true){
        goDetail() 
    }else if(menu.value==true){
        goChapter()
    }else{
        router.go(-1)
    }
})
</script>

<template>
    <van-empty description="描述文字">
        <van-button 
            round type="primary"
            style="width: 160px;height: 40px;background-color:red;"
            >
            带我去逛逛
        </van-button>
    </van-empty>
</template>

<style lang="scss" scoped>

</style>