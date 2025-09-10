import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './dashboard-component/dashboard-component';
import { combineLatest } from 'rxjs';
import { Component } from '@angular/core';
import {  TasksComponent } from './tasks/tasks';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  { path:'tasks',component:TasksComponent  },
  { path: '**', redirectTo: 'login' }
];
