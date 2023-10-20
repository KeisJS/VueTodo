import apiUrl from '@/utils/apiUrl/apiUrl';

describe('Test apiUrl', () => {
  test('default use', () => {
    expect(apiUrl('/example')).toBe('http://test/example')
  })
})
