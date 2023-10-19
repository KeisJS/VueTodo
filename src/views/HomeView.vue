<script setup lang="ts">
import TodoAdd from '@/components/todo/TodoAdd.vue';
import TodoList from '@/components/todo/TodoList.vue';
import { attachTaskApi } from '@/components/todo/taskApi';

attachTaskApi();
</script>

<template>
  <div class="container">
    <TodoAdd />
    <TodoList />
  </div>
</template>
