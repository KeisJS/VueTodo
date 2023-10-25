import useCacheTagManager from '@/utils/apiBuilder/cacheTagManager';
import { defineStore } from 'pinia';
import { parseTemplate } from 'url-template';
import type { TBuilderApiArgsMutation } from '@/utils/apiBuilder/apiBuilderMutation/types';
import buildApiStoreBase from '@/utils/apiBuilder/utils/buildApiStoreBase';
import { watch } from 'vue';
import type { IApiStoreArgs, IWatcherValues } from '@/utils/apiBuilder/types';

const apiBuilderMutation = <Response = void, QueryParams = void, Payload extends object = void, StoreId extends string>(
  params: TBuilderApiArgsMutation<Response, StoreId>
) => {
  const {
    initValue,
    defaultStoreId,
    url,
    method = 'POST',
    invalidateTag
  } = params
  
  return (args: IApiStoreArgs<QueryParams, Payload> = {}) => {
    const { paramsWatcher, storeId } = args
    const cacheTagManager = useCacheTagManager()
    
    const useStore = defineStore(storeId || defaultStoreId, () => {
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
        onFetchSuccess: () => {
          if (invalidateTag) {
            cacheTagManager.refresh(invalidateTag)
          }
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
      
      return {
        isFetching,
        isSuccess,
        isError,
        data: dataResponse,
        fetch,
        updateQueryOptions,
      }
    })
    
    const store = useStore()
    
    if (paramsWatcher) {
      watch(paramsWatcher, (args) => {
          store.updateQueryOptions(args)
        }
      )
    }
    
    return store
  }
}

export default apiBuilderMutation
