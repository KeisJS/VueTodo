import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { TCacheTypes } from '@/utils/apiBuilder/cacheTagManager/types';

const useCacheTagManager = defineStore('cacheTag', () => {
  const manager = ref<TCacheTypes[]>([])
  
  const refresh = (tag: TCacheTypes) => {
    manager.value = [tag]
  }
  
  return {
    manager,
    refresh,
  }
})

export default useCacheTagManager
