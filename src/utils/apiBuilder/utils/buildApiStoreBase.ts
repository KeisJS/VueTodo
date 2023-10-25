import { ref } from 'vue';
import { toValue } from 'vue';
import apiUrl from '@/utils/apiUrl/apiUrl';

interface IBuildApiStoreArgs<Response> {
  url: string
  initValue: Response
  method: string
  onBeforeFetch?: () => void
  onFetchSuccess?: () => void
}
const buildApiStoreBase = <Response, Payload>(args: IBuildApiStoreArgs<Response>) => {
  const {
    url,
    initValue,
    method,
    onFetchSuccess = () => {},
    onBeforeFetch = () => {}
  } = args
  const isFetching = ref(false)
  const isSuccess = ref<boolean | undefined>(undefined)
  const isError = ref<boolean | undefined>(undefined)
  const queryUrl = ref(url)
  const queryPayload = ref<Payload>()
  const dataResponse = ref<Response>(initValue)
  
  const concreteFetch = async () => {
    onBeforeFetch()
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
      onFetchSuccess()
    } catch (e) {
      isError.value = true
    } finally {
      isFetching.value = false
    }
  }
  
  return {
    isFetching,
    isSuccess,
    isError,
    queryUrl,
    queryPayload,
    dataResponse,
    fetch: concreteFetch
  }
}

export default buildApiStoreBase
