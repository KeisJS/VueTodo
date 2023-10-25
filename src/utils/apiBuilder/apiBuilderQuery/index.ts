import useCacheTagManager from '@/utils/apiBuilder/cacheTagManager';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { parseTemplate } from 'url-template';
import type { TBuilderApiArgsQuery } from '@/utils/apiBuilder/apiBuilderQuery/types';
import type { IApiStoreArgs, IWatcherValues } from '@/utils/apiBuilder/types';
import buildApiStoreBase from '@/utils/apiBuilder/utils/buildApiStoreBase';

const apiBuilderQuery = <Response = void, QueryParams = void, Payload extends object = void, StoreId extends string>(
  params: TBuilderApiArgsQuery<Response, StoreId>
) => {
  const {
    defaultStoreId,
    url,
    method = 'GET',
    initValue,
    cacheTag,
  } = params
  
  return (args: IApiStoreArgs<QueryParams, Payload> = {}) => {
    const { paramsWatcher, storeId } = args
    const cacheTagManager = useCacheTagManager()
    
    const useStore = defineStore(storeId || defaultStoreId, () => {
      const isNeedUpdate = ref(true)
      const {
        isFetching,
        isSuccess,
        isError,
        queryUrl,
        queryPayload,
        dataResponse,
        fetch,
      } = buildApiStoreBase<Response, Payload>({
        url,
        initValue,
        method,
        onBeforeFetch: () => {
          if (!isNeedUpdate.value) {
            return
          }
        },
        onFetchSuccess: () => {
          isNeedUpdate.value = false
        }
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
      
      watch(() => cacheTagManager.manager, (tags) => {
        if (cacheTag && tags.includes(cacheTag)) {
          isNeedUpdate.value = true
        }
      })
      
      return {
        isFetching,
        isSuccess,
        isError,
        data: dataResponse,
        fetch,
        updateQueryOptions,
        isNeedUpdate,
      }
    })
    
    const store = useStore()
    
    if (paramsWatcher) {
      watch(
        paramsWatcher,
        (args) => {
          store.updateQueryOptions(args)
          
          store.fetch()
        },
        {
          immediate: true
        }
      )
    } else {
      store.fetch()
    }
    
    if (cacheTag) {
      watch(() =>  cacheTagManager.manager, (tags) => {
        if (tags.includes(cacheTag)) {
          store.isNeedUpdate = true
          store.fetch()
        }
      })
    }
    
    return store
  }
}

export default apiBuilderQuery
