Task Manager Frontend (Angular)
📌 Overview

This is the frontend of the Task Manager App, built with Angular.
It communicates with the ASP.NET Core Web API backend to allow users to:

Register / Login

Manage tasks (Add, Edit, Delete, Mark as Done)

Filter tasks (All, Pending, Completed)

Use a responsive and user-friendly UI

🚀 Features

🔑 User Authentication (Register/Login)

📝 Task Management (Add, Edit, Delete, Mark as Done)

🔎 Task Filtering (All, Pending, Completed)

📱 Responsive design for desktop & mobile

✅ Input validation for Title & Description

⚡ Instant updates without page refresh

📂 Prerequisites

Make sure you have installed:

Node.js
 (LTS version recommended)

Angular CLI

⚙️ Installation & Running

Clone the repository:

git clone https://github.com/madonna-hany-boils/taskManagerFront.git
cd taskManagerFront


Install dependencies:

npm install


Run the Angular app:

ng serve


Open your browser at:

http://localhost:4200

🔗 Backend

Make sure the backend API (ASP.NET Core Web API) is running.
By default, the app connects to:

http://taskymanager.runasp.net/api


You can change this in the Angular service file if needed.

📄 Notes

First register a user via the Register page.

Then login to manage your tasks.
