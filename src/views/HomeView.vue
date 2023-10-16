<script setup lang="ts">
import TodoAdd from '@/components/todo/TodoAdd.vue';
import TodoList from '@/components/todo/TodoList.vue';
import { attachTaskProvider } from '@/components/todo/taskProvider';

attachTaskProvider();
</script>

<template>
  <div class="container">
    <TodoAdd />
    <TodoList />
  </div>
</template>
