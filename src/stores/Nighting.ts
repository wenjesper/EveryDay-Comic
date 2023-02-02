import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }
//   return { count, doubleCount, increment }
// })
export const useNightMode = defineStore('nighting', () => {
  const night = ref(false)
  function change() {
    night.value=!night.value
  }
  return { night,change}
})
