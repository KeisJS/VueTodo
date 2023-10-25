import type { ITodo } from '@/components/todo/types';
import apiBuilder from '@/utils/apiBuilder';

const useTasksFetch = apiBuilder<ITodo[]>({
  defaultStoreId: 'tasks',
  url: '/tasks',
  initValue: [],
  cacheTag: 'TASKS',
})

const useTaskAdd = apiBuilder<void, void, Partial<ITodo>>({
  method: 'POST',
  defaultStoreId: 'addTask',
  url: '/tasks',
  invalidateTag: 'TASKS',
})

export {
  useTasksFetch,
  useTaskAdd,
}
