import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskCreateRequest, TaskResponse, TaskUpdateRequest, TaskService } from '../services/task';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.css'],
  imports: [CommonModule, FormsModule]
})
export class TasksComponent implements OnInit {
  tasks: TaskResponse[] = [];
  filteredTasks: TaskResponse[] = [];
  newTask: TaskCreateRequest = { title: '', description: '', userId: 1, status: 1 };
  isEditing = false;
  editingTaskId: number | null = null;
  loading = false;

  // Validation messages
  titleError = '';
  descriptionError = '';
  successMessage = '';

  constructor(private taskService: TaskService, private authService: AuthService) {}

  ngOnInit() {
    const userId = this.authService.getUserId();
    if (userId) this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    const userId = this.authService.getUserId();
    this.taskService.getTasks().subscribe({
      next: (res) => {
        this.tasks = userId ? res.filter(t => t.userId === userId) : res;
        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading tasks:', err);
        this.loading = false;
      }
    });
  }

  validateForm(): boolean {
    this.titleError = '';
    this.descriptionError = '';
    let isValid = true;

    if (!this.newTask.title.trim()) {
      this.titleError = 'Title is required';
      isValid = false;
    }
    if (!this.newTask.description.trim()) {
      this.descriptionError = 'Description is required';
      isValid = false;
    }
    return isValid;
  }

  addTask() {
    if (!this.validateForm()) return;

    const userId = this.authService.getUserId() || 1;
    this.newTask.userId = userId;

    this.taskService.addTask(this.newTask).subscribe({
      next: (res) => {
        this.tasks.push(res);
        this.applyFilter();
        this.resetForm();
        this.successMessage = 'Task added successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      error: (err) => console.error('Error adding task:', err)
    });
  }

  updateTask() {
    if (!this.validateForm()) return;
    if (this.editingTaskId === null) return;

    const confirmed = window.confirm('Are you sure you want to update this task?');
    if (!confirmed) return;

    const updateReq: TaskUpdateRequest = {
      id: this.editingTaskId,
      title: this.newTask.title,
      description: this.newTask.description,
      status: this.newTask.status
    };

    this.taskService.updateTask(updateReq).subscribe({
      next: () => {
        const idx = this.tasks.findIndex(t => t.id === this.editingTaskId);
        if (idx > -1) this.tasks[idx] = { ...this.tasks[idx], ...updateReq };
        this.applyFilter();
        this.resetForm();
        this.successMessage = 'Task updated successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      error: (err) => console.error('Error updating task:', err)
    });
  }

  editTask(task: TaskResponse) {
    this.newTask = {
      title: task.title,
      description: task.description,
      userId: (task.userId ?? this.authService.getUserId()) || 1,
      status: task.status
    };
    this.isEditing = true;
    this.editingTaskId = task.id;
  }

  deleteTask(id: number) {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (!confirmed) return;

    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.applyFilter();
        this.successMessage = 'Task deleted successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      error: (err) => console.error('Error deleting task:', err)
    });
  }

markAsDone(id: number) {
  this.taskService.markAsDone(id).subscribe({
    next: (res) => {
      // عملية ناجحة سواء كان response فارغ أو لا
      const task = this.tasks.find(t => t.id === id);
      if (task) task.status = 2;
      this.applyFilter();
      this.successMessage = 'Task marked as done!';
      setTimeout(() => (this.successMessage = ''), 3000);
    },
    error: (err) => {
      // في حالة backend بيرجع 200 مع body فارغ
      if (err.status === 200) {
        const task = this.tasks.find(t => t.id === id);
        if (task) task.status = 2;
        this.applyFilter();
        this.successMessage = 'Task marked as done!';
        setTimeout(() => (this.successMessage = ''), 3000);
      } else {
        console.error('Error marking task as done:', err);
      }
    }
  });
}


  filterTasks(event: Event) {
    this.applyFilter((event.target as HTMLInputElement).value);
  }

  private applyFilter(selectedFilter?: string) {
    if (!selectedFilter) {
      selectedFilter = (document.querySelector('input[name="statusFilter"]:checked') as HTMLInputElement)?.value || '';
    }
    this.filteredTasks = selectedFilter
      ? this.tasks.filter(t => String(t.status) === selectedFilter)
      : [...this.tasks];
  }

  private resetForm() {
    this.newTask = { title: '', description: '', userId: this.authService.getUserId() || 1, status: 1 };
    this.isEditing = false;
    this.editingTaskId = null;
    this.titleError = '';
    this.descriptionError = '';
  }
}
