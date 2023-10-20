import { rest } from 'msw';
import testServer from '@/utils/test/setupServer';
import apiUrl from '@/utils/apiUrl/apiUrl';
import appFetch from '@/utils/fetch/appFetch';

describe('Test setupServer', () => {
  test('default use', async () => {
    testServer.use(rest.get(apiUrl('/testPath'), (
      req,
      res,
      ctx
    ) => res(
      ctx.status(200),
      ctx.json({ msg: 'Hello test' })
    )))
    
    const response = await appFetch('/testPath')
    const { msg } = await response.json()
    
    expect(msg).toBe('Hello test')
  })
})

