import apiUrl from '@/utils/apiUrl/apiUrl';

const appFetch = (url: string, options?: RequestInit) => {
  return fetch(apiUrl(url), options)
}

export default appFetch
