import useFetch from '@/utils/useFetch';
import type { InjectionKey } from 'vue';
import type { ITodo } from '@/components/todo/types';
import { inject, provide } from 'vue';

const taskProvider = () => {
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

const providerKey = Symbol() as InjectionKey<ReturnType<typeof taskProvider>>

const attachTaskProvider = () => {
  provide(providerKey, taskProvider())
}

const injectTasks = () => inject(providerKey);

export { taskProvider, injectTasks, attachTaskProvider }
