import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  todoForm: FormGroup;
  submitting = false;
  error: string | null = null;
  success = false;

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService
  ) {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      this.submitting = true;
      this.error = null;
      this.success = false;

      const todo: Todo = {
        title: this.todoForm.value.title,
        description: this.todoForm.value.description || '',
        completed: false
      };

      this.todoService.createTodo(todo).subscribe({
        next: () => {
          this.success = true;
          this.todoForm.reset();
          this.submitting = false;
          
          setTimeout(() => {
            this.success = false;
            window.dispatchEvent(new Event('todoCreated'));
          }, 2000);
        },
        error: (err) => {
          this.error = 'Failed to create todo. Make sure the backend is running.';
          this.submitting = false;
          console.error('Error creating todo:', err);
        }
      });
    }
  }

  get title() {
    return this.todoForm.get('title');
  }
}