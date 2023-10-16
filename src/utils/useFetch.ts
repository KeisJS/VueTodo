import { reactive, ref, watch } from 'vue';

interface IUseFetchParams {
  url: string;
  method?: 'GET';
}

interface IRequestState<Data> {
  isLoading: boolean;
  data?: Data;
  error?: any;
  fetch: () => void;
}

const useFetch = <Response>(fetchParams: IUseFetchParams) => {
  const { url, method = "GET" } = fetchParams;
  const reFetch = ref(true);
  const request = reactive<IRequestState<Response>>({
    isLoading: false,
    fetch: () => reFetch.value = !reFetch.value
  })
  
  watch([reFetch, () => request.fetch], async () => {
    request.isLoading = true
    
    try {
      const response = await fetch<Response>(url, {
        method
      })
      
      request.data = await response.json()
    } catch (e) {
      request.error = e
    } finally {
      request.isLoading = false
    }
  })
  
  if (method === 'GET') {
    request.fetch()
  }
  
  return request;
}

export default useFetch
