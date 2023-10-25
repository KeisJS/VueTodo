import { TCacheTypes } from '@/utils/apiBuilder/cacheTagManager/types';
import type { IBuilderApiArgsAbstract } from '@/utils/apiBuilder/types';

export type TBuilderApiArgsQuery<Response, StoreId> = IBuilderApiArgsAbstract<Response, StoreId> & {
  method?: 'GET' | 'POST'
  cacheTag?: TCacheTypes
}
