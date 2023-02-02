<script setup lang="ts">
import {  onMounted, toRefs } from "vue"
import type { DetailComics } from "@/typings";
import { useRouter } from 'vue-router'
const props = defineProps<{
    comics: Array<DetailComics>
}>()
const router = useRouter()
const goChapter=(id:number)=>{
   router.push({ 
     path:'/Chapter',
     query:{
        id
     }
  }) 
}
const { comics } = toRefs(props)
onMounted(()=>{
    console.log(comics.value);
    
})
</script>

<template>
    <div class="list">

    </div>
</template>

<style lang="scss" scoped>
</style>