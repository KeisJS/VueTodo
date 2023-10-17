import { reactive, ref, toValue, watch } from 'vue';

interface IUseFetchParams {
  url: string;
  method?: 'GET' | 'POST';
}

interface IRequestState<Response, Payload> {
  isLoading: boolean;
  data?: Response;
  error?: any;
  reFetch: () => void;
  fetch: (data: Payload) => void;
}

const useFetch = <Response, Payload extends BodyInit>(fetchParams: IUseFetchParams) => {
  const { url, method = 'GET' } = fetchParams;
  const reFetch = ref(true);
  const data = ref<Payload>('')
  const request = reactive<IRequestState<Response, Payload>>({
    isLoading: false,
    reFetch: () => reFetch.value = !reFetch.value,
    fetch: (payload) => data.value = payload
  })
  
  watch([reFetch, data, () => request.fetch], async () => {
    request.isLoading = true
    
    try {
      const options = {
        method
      } as RequestInit
      
      if (method !== 'GET') {
        options.body = JSON.stringify((toValue(data) || ''))
      }
      const response = await fetch<Response>(url, options)
      
      request.data = await response.json()
    } catch (e) {
      request.error = e
    } finally {
      request.isLoading = false
    }
  })
  
  if (method === 'GET') {
    request.reFetch()
  }
  
  return request;
}

export default useFetch
