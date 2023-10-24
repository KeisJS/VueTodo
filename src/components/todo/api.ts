import type { ITodo } from '@/components/todo/types';
import apiBuilder from '@/utils/apiBuilder';

const useTasksFetch = apiBuilder<ITodo[]>({
  defaultStoreId: 'tasks',
  url: '/tasks',
  initValue: [],
})

const useTaskAdd = apiBuilder<void, void, Partial<ITodo>>({
  defaultStoreId: 'addTask',
  url: '/tasks',
  method: 'POST'
})

export {
  useTasksFetch,
  useTaskAdd,
}
