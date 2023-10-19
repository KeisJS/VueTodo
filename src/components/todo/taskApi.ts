import type { InjectionKey } from 'vue';
import type { ITodo } from '@/components/todo/types';
import { inject, provide } from 'vue';
import useFetch from '@/utils/useFetch/useFetch';

const taskApi = () => {
  const tasks = useFetch<ITodo[]>({
    url: '/tasks',
  })
  
  const addTask = useFetch<void, Partial<ITodo>>({
    url: '/tasks',
    method: 'POST'
  })
  
  return {
    tasks,
    addTask,
  }
}

const providerKey = Symbol() as InjectionKey<ReturnType<typeof taskApi>>

const attachTaskApi = () => {
  provide(providerKey, taskApi())
}

const injectTasksApi = () => inject(providerKey) as ReturnType<typeof taskApi>;

export { injectTasksApi, attachTaskApi }
