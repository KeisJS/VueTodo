export interface IWatcherValues<QueryParams, Payload> {
  params?: QueryParams
  data?: Payload
}

export interface IBuilderApiArgsAbstract<Response, StoreId> {
  initValue?: Response
  defaultStoreId: StoreId
  url: string // url template
}

export interface IApiStoreArgs<QueryParams, Payload> {
  paramsWatcher?: () => IWatcherValues<QueryParams, Payload>
  storeId?: string
}
