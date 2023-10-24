import type { ITodo } from '@/components/todo/types';
import apiBuilder from '@/utils/apiBuilder';

const useTasksFetch = apiBuilder<ITodo[]>({
  url: '/tasks',
  storeId: 'tasks',
  initValue: [],
})

const useTaskAdd = apiBuilder<void, void, Partial<ITodo>>({
  storeId: 'addTask',
  url: '/tasks',
  method: 'POST'
})

export {
  useTasksFetch,
  useTaskAdd,
}
