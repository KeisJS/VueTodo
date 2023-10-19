<script setup lang="ts">
import { injectTasksApi } from '@/components/todo/taskApi';
import { watch } from 'vue';

const { tasks, addTask } = injectTasksApi()
const { data } = tasks;

watch(addTask.isSuccess, (isSuccess) => {
  if (isSuccess) {
    tasks.reFetch();
  }
})
</script>

<template>
<div class="row justify-content-center">
  <div class=" col-6 mb-3">
    <table class="table">
      <thead>
        <tr>
          <th>Описание задачи</th>
          <th>Дата создания</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in data" :key="task.id">
          <td>{{ task.description }}</td>
          <td>{{ task.created }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>
