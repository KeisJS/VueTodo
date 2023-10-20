const apiUrl = (url: string) => {
  if (import.meta.env.MODE === 'test') {
    return `http://test${url}`
  }
  
  return url
}

export default apiUrl
