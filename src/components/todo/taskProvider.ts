import useFetch from '@/utils/useFetch';
import type { InjectionKey } from 'vue';
import type { ITodo } from '@/components/todo/types';
import { inject, provide } from 'vue';

const taskProvider = () => {
  const tasks = useFetch<ITodo[]>({
    url: '/tasks',
  })
  
  return {
    tasks,
  }
}

const providerKey = Symbol() as InjectionKey<ReturnType<typeof taskProvider>>

const attachTaskProvider = () => {
  provide(providerKey, {
    tasks: useFetch<ITodo[]>({
      url: '/tasks',
    })
  })
}

const injectTasks = () => inject(providerKey);

export { taskProvider, injectTasks, attachTaskProvider }
