<script setup lang="ts">
import { watch } from 'vue';
import { useTaskAdd, useTasksFetch } from '@/components/todo/api';


const addTask = useTaskAdd()
const tasks = useTasksFetch()

watch(() => addTask.isSuccess, (isSuccess) => {
  if (isSuccess) {
    tasks.fetch();
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
        <tr v-for="task in tasks.data" :key="task.id">
          <td>{{ task.description }}</td>
          <td>{{ task.created }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>
