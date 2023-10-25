import type { ITodo } from '@/components/todo/types';
import apiBuilderQuery from '@/utils/apiBuilder/apiBuilderQuery';
import apiBuilderMutation from '@/utils/apiBuilder/apiBuilderMutation';

const useTasksFetch = apiBuilderQuery<ITodo[]>({
  defaultStoreId: 'tasks',
  url: '/tasks',
  initValue: [],
  cacheTag: 'TASKS',
})

const useTaskAdd = apiBuilderMutation<void, void, Partial<ITodo>>({
  method: 'POST',
  defaultStoreId: 'addTask',
  url: '/tasks',
  invalidateTag: 'TASKS',
})

export {
  useTasksFetch,
  useTaskAdd,
}
