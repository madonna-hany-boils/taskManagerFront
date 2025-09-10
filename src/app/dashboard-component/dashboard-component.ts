import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { TaskResponse, TaskService } from '../services/task';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-component.html',
  styleUrls: ['./dashboard-component.css']
})
export class DashboardComponent implements OnInit {
  username: string = '';
  tasks: TaskResponse[] = [];

  stats: { title: string; count: number; icon: string; color: string }[] = [
  { title: 'Total Tasks', count: 0, icon: '📋', color: 'blue' },
  { title: 'Completed', count: 0, icon: '✅', color: 'green' },
  { title: 'Pending', count: 0, icon: '🛑', color: 'red' }
];


  constructor(
    private authService: AuthService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {

    this.username = this.authService.getUsername() ?? 'Guest';
    console.log('Username from AuthService:', this.username);

    // 📊 تحميل المهام وحساب الإحصائيات
    this.loadStats();
  }

loadStats(): void {
  this.taskService.getTasks().subscribe({
    next: (res) => {
      this.tasks = res;
      console.log('Tasks response:', this.tasks);

      const total = this.tasks.length;
      const completed = this.tasks.filter(t => t.status === 2).length;
      const pending = this.tasks.filter(t => t.status === 1).length;

      // 👇 نعمل Array جديدة (عشان Angular يعمل detect)
      this.stats = [
  { title: 'Total Tasks', count: total, icon: '📋', color: 'blue' },
  { title: 'Completed', count: completed, icon: '✅', color: 'green' },
  { title: 'Pending', count: pending, icon: '🛑', color: 'red' }
];
console.log('Stats updated:', this.stats);

    },
    error: (err) => {
      console.error('Error fetching tasks', err);
    }
  });
}


}
