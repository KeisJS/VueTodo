import { TCacheTypes } from '@/utils/apiBuilder/cacheTagManager/types';
import { IBuilderApiArgsAbstract } from '@/utils/apiBuilder/types';

export type TBuilderApiArgsMutation<Response, StoreId> = IBuilderApiArgsAbstract<Response, StoreId> & {
  method: 'POST'
  invalidateTag?: TCacheTypes
}
