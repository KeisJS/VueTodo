import { rest } from 'msw';
import todoMockListData from '@/components/todo/mock/todoMockListData';

const sessionStorage = {
  nextId: 4,
  values: todoMockListData,
}

export default [
  rest.get('/tasks', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(sessionStorage.values),
    )
  })
]
