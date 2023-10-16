<script setup lang="ts">
import { injectTasks } from '@/components/todo/taskProvider';

const taskDeps = injectTasks()
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
        <tr v-for="task in taskDeps?.tasks.data" :key="task.id">
          <td>{{ task.description }}</td>
          <td>{{ task.created }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>
