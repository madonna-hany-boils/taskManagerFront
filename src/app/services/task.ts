

// src/app/models/task.model.ts
export interface TaskResponse {
  id: number;
  title: string;
  description: string;
  status: number; 
  createdAt?: string;
  updatedAt?: string;
  userId?: number;
}

// request لما نضيف
export interface TaskCreateRequest {
  title: string;
  description: string;
  userId: number;
  status: number;
}

// request لما نعدّل
export interface TaskUpdateRequest {
  id: number;
  title: string;
  description: string;
  status: number;
}

// request لما نعمل mark as done
export interface TaskMarkDoneRequest {
  id: number;
}
// src/app/services/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://taskymanager.runasp.net/api/TaskItem';

  constructor(private http: HttpClient) {}

  // GET all
  getTasks(): Observable<TaskResponse[]> {
    return this.http.get<TaskResponse[]>(this.apiUrl);
  }

  // ADD
  addTask(task: TaskCreateRequest): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(this.apiUrl, task);
  }

  // UPDATE full (title, desc, status)
  updateTask(task: TaskUpdateRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${task.id}`, task);
  }

  // DELETE
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

   markAsDone(taskId: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${taskId}/done`, {}); 
    // {} عشان بعض الـ APIs بتطلب Body فاضي
  }
}
