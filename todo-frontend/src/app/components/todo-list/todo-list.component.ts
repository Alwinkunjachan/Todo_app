import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  loading = false;
  error: string | null = null;
  filter: 'all' | 'active' | 'completed' = 'all';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
    
    // Listen for todo creation events
    window.addEventListener('todoCreated', () => {
      this.loadTodos();
    });
  }

  loadTodos(): void {
    this.loading = true;
    this.error = null;
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load todos. Make sure the backend is running.';
        this.loading = false;
        console.error('Error loading todos:', err);
      }
    });
  }

  toggleComplete(todo: Todo): void {
    if (!todo.id) return;
    const updatedTodo = { ...todo, completed: !todo.completed };
    this.todoService.updateTodo(todo.id, updatedTodo).subscribe({
      next: () => {
        this.loadTodos();
      },
      error: (err) => {
        this.error = 'Failed to update todo.';
        console.error('Error updating todo:', err);
      }
    });
  }

  deleteTodo(id: number): void {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.todoService.deleteTodo(id).subscribe({
        next: () => {
          this.loadTodos();
        },
        error: (err) => {
          this.error = 'Failed to delete todo.';
          console.error('Error deleting todo:', err);
        }
      });
    }
  }

  get filteredTodos(): Todo[] {
    if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    } else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    }
    return this.todos;
  }

  setFilter(filter: 'all' | 'active' | 'completed'): void {
    this.filter = filter;
  }
}