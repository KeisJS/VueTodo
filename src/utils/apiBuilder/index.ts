import { defineStore } from 'pinia';
import { ref, toValue, watch } from 'vue';
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
    
    const useStore = defineStore<StoreId, IApiStore<Response, QueryParams, Payload>>(storeId, () => {
      const isFetching = ref(false)
      const isSuccess = ref<boolean | undefined>(undefined)
      const isError = ref<boolean | undefined>(undefined)
      const queryUrl = ref(url)
      const queryPayload = ref<Payload>()
      const fetchFlag = ref<boolean>(false)
      const dataResponse = ref<Response>(initValue)
      const concreteFetch = async () => {
        const actualUrl = toValue(queryUrl)
        const data = toValue(queryPayload)
        
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
      
      watch(fetchFlag, () => {
        concreteFetch()
      })
      
      const updateQueryOptions = (options: IWatcherValues<QueryParams, Payload>) => {
        const { data, params } = options
        
        if (params) {
          queryUrl.value = parseTemplate(url).expand(params)
        }
        
        if (data) {
          queryPayload.value = data
        }
      }
      
      return {
        isFetching,
        isSuccess,
        isError,
        data: dataResponse,
        fetch: () => fetchFlag.value = !fetchFlag.value,
        updateQueryOptions,
      }
    })
    
    const store = useStore()
    
    const watchOptions: WatchOptions = {}
    
    if (method === 'GET') {
      watchOptions.immediate = true
    }
    
    if (paramsWatcher) {
      watch(
        () => ({ ...(paramsWatcher()) }),
        (args) => {
          store.updateQueryOptions(args)
          
          if (method === 'GET') {
            store.fetch()
          }
        },
        watchOptions
      )
    } else {
      if (method === 'GET') {
        store.fetch()
      }
    }
    
    return store
  }
}

export default apiBuilder
