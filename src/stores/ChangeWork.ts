import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const useChangeWork = defineStore('changework', () => {
  const book = ref(false)
  const bookid=ref()
  const menu = ref(false)
  const menuid =ref()
  return {book,menu,bookid,menuid}
})
