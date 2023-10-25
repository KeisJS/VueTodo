import { rest } from 'msw';
import todoMockListData from '@/components/todo/mock/todoMockListData';

const sessionStorage = {
  nextId: 5,
  values: todoMockListData,
}

export default [
  rest.get('/tasks', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(sessionStorage.values),
    )
  }),
  
  rest.post('/tasks', async (req, res, ctx) => {
    const body = await req.json()
    
    sessionStorage.values.push({
      id: sessionStorage.nextId++,
      ...body,
    })
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(res(
          ctx.status(200),
          ctx.json('')
        ))
      }, 500)
    })
  })
]
