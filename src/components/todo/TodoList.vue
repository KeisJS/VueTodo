<script setup lang="ts">
import { ref } from 'vue';

const tasks = ref([
  { id: 1, description: 'Task one', created: '2023-10-12T18:49:37.617Z' },
  { id: 2, description: 'Task two', created: '2023-10-12T19:49:37.617Z' },
  { id: 3, description: 'Task three', created: '2023-10-12T20:49:37.617Z' },
])
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
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.description }}</td>
          <td>{{ task.created }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>
