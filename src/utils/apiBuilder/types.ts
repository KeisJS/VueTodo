import type { TCacheTypes } from '@/utils/apiBuilder/cacheTagManager/types';

export interface IWatcherValues<QueryParams, Payload> {
  params?: QueryParams
  data?: Payload
}

interface IBuilderApiArgsAbstract<Response, StoreId> {
  defaultStoreId: StoreId
  url: string // url template
  initValue?: Response
}

interface IBuilderApiArgsQuery {
  method?: 'GET'
  cacheTag?: TCacheTypes
}

interface IBuilderApiArgsMutation {
  method: 'POST'
  invalidateTag?: TCacheTypes
}

export type TBuilderApiArgs<Response, StoreId> = IBuilderApiArgsAbstract<Response, StoreId> & (
    IBuilderApiArgsQuery | IBuilderApiArgsMutation
  )


export interface IApiStoreArgs<QueryParams, Payload> {
  paramsWatcher?: () => IWatcherValues<QueryParams, Payload>
  storeId?: string
}
