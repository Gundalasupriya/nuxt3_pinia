import { FilterTodos } from './../.nuxt/components.d';
import { defineStore } from "pinia"
import { AddTodo } from "~~/.nuxt/components";
import { TodoItem } from "~~/types/todo";
export const useTodoStore = defineStore('todos', {
  state: () => ({todos: [] as TodoItem[]}),
  actions: {
    async fetchTodos() {
    const response = await $fetch<TodoItem[]>(
      'https://jsonplaceholder.typicode.com/todos'
    )

    this.todos = response;
    },
   async filterTodos(e: any) {
    const limit = parseInt(
      e.target.options[e.target.options.selectedIndex].innerText
    );
    const response = await $fetch(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    );
    this.todos= response;
   },
   async updateTodo(updateTodo:any) {
    const response = await $fetch<TodoItem[]> (
      `https://jsonplaceholder.typicode.com/todos/${updateTodo.id}`,
      {
        method: "PUT", body: {
          title:updateTodo.title,
          completed:updateTodo.completed
        }
      }
    )
    var index = this.todos.findIndex((todo: { id: any; }) => todo.id === updateTodo.id) 
    if(index !== -1){
      this.todos.splice(index,1,updateTodo)
    }
   },
    async addTodo(title: string) {
      // console.log("adding")
      const response = await $fetch<TodoItem> (
        "https://jsonplaceholder.typicode.com/todos",{
        method: "POST",
        body:{
          title:title,
          // body:"",
          
        },
      })
      this.todos.unshift(response);
    },
    async deleteTodo(id:number) {
      const response = await $fetch<TodoItem>
      ('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'DELETE',
});
   this.todos = this.todos.filter((todo: { id: number; }) => todo.id !== id)
    },
   
  }
})