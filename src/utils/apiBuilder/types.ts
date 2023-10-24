import { Ref } from 'vue/dist/vue';
import type { TCacheTypes } from '@/utils/apiBuilder/cacheTagManager/types';

export interface IWatcherValues<QueryParams, Payload> {
  params?: QueryParams
  data?: Payload
}

export interface IBuilderApiArgs<Response, QueryParams, Payload, StoreId> {
  defaultStoreId: StoreId
  url: string // url template
  method?: 'GET' | 'POST'
  initValue?: Response
  cacheTag?: TCacheTypes
  invalidateTag?: TCacheTypes
}

export interface IApiStoreArgs<QueryParams, Payload> {
  paramsWatcher?: () => IWatcherValues<QueryParams, Payload>
  storeId?: string
}

export interface IApiStore<Response, QueryParams, Payload> {
  data: Ref<Response | undefined>
  isFetching: Ref<boolean>
  isSuccess: Ref<boolean | undefined>
  isError: Ref<boolean | undefined>
  fetch: () => void
  updateQueryOptions: (options: IWatcherValues<QueryParams, Payload>) => void
}
