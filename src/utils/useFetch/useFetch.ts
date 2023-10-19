import { ref, toValue, watch } from 'vue';
import type { IUseFetchParams } from '@/utils/useFetch/types';

const useFetch = <Response, Payload>(fetchParams: IUseFetchParams) => {
  const { url, method = 'GET' } = fetchParams
  const reFetchState = ref(true)
  const data = ref<Payload>('')
  const isFetching = ref(false)
  const isSuccess = ref(false)
  const reFetch = () => reFetchState.value = !reFetchState.value
  const responseData = ref<Response>()
  const error = ref()
  
  watch([reFetchState, data], async () => {
    isFetching.value = true
    isSuccess.value = false
    
    try {
      const options = {
        method
      } as RequestInit
      
      if (method !== 'GET') {
        options.body = JSON.stringify((toValue(data) || ''))
      }
      
      const response = await fetch<Response>(url, options)
      
      responseData.value = await response.json()
      isSuccess.value = true
    } catch (e) {
      error.value = e
      isSuccess.value = false
    } finally {
      isFetching.value = false
    }
  })
  
  if (method === 'GET') {
    reFetch()
  }
  
  return {
    isFetching,
    isSuccess,
    data: responseData,
    error: error,
    fetch: (payload: Payload) => data.value = payload,
    reFetch,
  };
}

export default useFetch
