import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { WatchOptions } from 'vue';
import { parseTemplate } from 'url-template';
import apiUrl from '@/utils/apiUrl/apiUrl';
import type { IApiStore, IApiStoreArgs, IBuilderApiArgs, IWatcherValues } from '@/utils/apiBuilder/types';

const apiBuilder = <Response = void, QueryParams = void, Payload extends object = void, StoreId extends string>(
  params: IBuilderApiArgs<Response, QueryParams, Payload, StoreId>
) => {
  const {
    storeId,
    url,
    method = 'GET',
    initValue,
  } = params
  
  return (args: IApiStoreArgs<QueryParams, Payload> = {}) => {
    const { paramsWatcher } = args
    
    const useStore = defineStore<StoreId, IApiStore<Response>>(storeId, () => {
      const isFetching = ref(false)
      const isSuccess = ref<boolean | undefined>(undefined)
      const isError = ref<boolean | undefined>(undefined)
      const fetchFlag = ref<boolean>(false)
      const dataResponse = ref<Response>(initValue)
      const concreteFetch = async (args: IWatcherValues<QueryParams, Payload> = {}) => {
        const { data, params } = args
        const actualUrl = params ? parseTemplate(url).expand(params) : url
        
        try {
          isFetching.value = true
          isSuccess.value = undefined
          isError.value = undefined
          const options: RequestInit = { method }
          
          if (method !== 'GET' && data) {
            options.body = JSON.stringify(data)
          }
          
          const response = await fetch(apiUrl(actualUrl), options)
          
          dataResponse.value = await response.json()
          isSuccess.value = true
        } catch (e) {
          isError.value = true
        } finally {
          isFetching.value = false
        }
      }
      
      const watchOptions: WatchOptions = {}
      
      if (method === 'GET') {
        watchOptions.immediate = true
      }
      
      if (paramsWatcher && method === 'GET') {
        watch(
          () => ({ ...(paramsWatcher()), fetch: fetchFlag.value }),
          (args) => {
            concreteFetch(args)
          },
          watchOptions
        )
      } else {
        watch(fetchFlag, () => {
          const args = paramsWatcher && paramsWatcher()
          
          concreteFetch(args)
        }, watchOptions)
      }
      
      return {
        isFetching,
        isSuccess,
        isError,
        data: dataResponse,
        fetch: () => fetchFlag.value = !fetchFlag.value
      }
    })
    
    return useStore()
  }
}

export default apiBuilder
