import { Ref } from 'vue/dist/vue';

export interface IWatcherValues<QueryParams, Payload> {
  params?: QueryParams
  data?: Payload
}

export interface IBuilderApiArgs<Response, QueryParams, Payload, StoreId> {
  storeId: StoreId
  url: string // url template
  method?: 'GET' | 'POST'
  initValue?: Response
}

export interface IApiStoreArgs<QueryParams, Payload> {
  paramsWatcher?: () => IWatcherValues<QueryParams, Payload>
}

export interface IApiStore<Response> {
  data: Ref<Response | undefined>
  isFetching: Ref<boolean>
  isSuccess: Ref<boolean | undefined>
  isError: Ref<boolean | undefined>
  fetch: () => void
}
