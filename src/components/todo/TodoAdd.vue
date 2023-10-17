<script setup lang="ts">
import { ref, toValue } from 'vue';
import { injectTasks } from '@/components/todo/taskProvider';

const taskDescription = ref('')

const taskDeps = injectTasks()

const addHandler = () => {
  taskDeps?.addTask.fetch({
    description: toValue(taskDescription),
    created: (new Date()).toISOString(),
  })
}
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-6 mb-3 mt-3">
      <label for="add-todo">Добавить новый todo</label>
      <div class="input-group">
        <input id="add-todo" class="form-control" type="text" v-model.trim="taskDescription" >
        <button class="btn btn-primary" :disabled="!taskDescription"  @click="addHandler">Добавить</button>
      </div>
    </div>
  </div>
</template>
