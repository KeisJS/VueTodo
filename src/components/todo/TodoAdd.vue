<script setup lang="ts">
import { computed, ref, toValue, watch } from 'vue';
import { injectTasksApi } from '@/components/todo/taskApi';

const taskDescription = ref('')

const { addTask } = injectTasksApi()

const addHandler = () => {
  addTask.fetch({
    description: toValue(taskDescription),
    created: (new Date()).toISOString(),
  })
}

watch(addTask.isSuccess, (isSuccess) => {
  if (isSuccess) {
    taskDescription.value = '';
  }
})

const isDisabled = computed(() => !taskDescription.value || addTask.isFetching.value)
const isInputDisabled = addTask.isFetching;
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-6 mb-3 mt-3">
      <label for="add-todo">Добавить новый todo</label>
      <div class="input-group">
        <input
            id="add-todo"
            class="form-control"
            type="text"
            :disabled="isInputDisabled"
            @keyup.enter="addHandler"
            v-model.trim="taskDescription" >
        <button class="btn btn-primary" :disabled="isDisabled"  @click="addHandler">Добавить</button>
      </div>
    </div>
  </div>
</template>
