<template>
  <div>
    Filter Todos:
    <select @change="filterTodos">
      <option value="200">200</option>
      <option value="100">100</option>
      <option value="50">50</option>
      <option value="20">20</option>
      <option value="10">10</option>
      <option value="5">5</option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { useTodoStore } from "~~/store/todos";
const todosStore = useTodoStore() as any;
const filterTodos = async (e: any) => {
  await todosStore.filterTodos(e);
};
</script>

<style scoped>
select {
  margin-top: 20px;
  padding: 6px;
  border: #41b883 1px solid;
}
</style>
