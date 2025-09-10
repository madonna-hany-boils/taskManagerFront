import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css']
})
export class ThemeToggleComponent {
  isDark = true;

  constructor() {
   
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') {
        this.isDark = false;
        document.body.classList.remove('dark-mode');
      }
    }
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;

    if (this.isDark) {
      document.body.classList.add('dark-mode');
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', 'dark');
      }
    } else {
      document.body.classList.remove('dark-mode');
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', 'light');
      }
    }
  }
}
