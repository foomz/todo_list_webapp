Project Description: Todo List Web Application
Overview:
This project is a Todo List Web Application built with React and styled using Tailwind CSS. It leverages Supabase for backend services, including database management and user authentication. The application allows users to manage their tasks efficiently by adding, updating, and deleting tasks. It also provides real-time updates and progress tracking.

Features:
User Authentication: Users can sign up, sign in, and sign out using Supabase authentication.
Task Management: Users can add new tasks, mark tasks as completed, and delete tasks.
Real-time Updates: The application fetches tasks from the Supabase database and updates the UI in real-time.
Progress Tracking: Displays the progress of completed tasks as a percentage.
Responsive Design: The application is styled with Tailwind CSS to ensure a responsive and modern user interface.

Technologies Used:
Frontend: React, Tailwind CSS
Backend: Supabase (for database and authentication)
Build Tool: Vite
Icons: Heroicons
Notifications: React Hot Toast

Key Components:
Dashboard.jsx: The main component that displays the task dashboard, including task management functionalities and progress tracking.
AuthContext.jsx: Provides authentication context and methods for user authentication.
supabase.js: Initializes the Supabase client for database interactions.

Project Structure:
src/pages/Dashboard.jsx: Contains the main dashboard component where users can manage their tasks.
src/context/AuthContext.jsx: Manages user authentication state and provides authentication methods.
src/lib/supabase.js: Initializes and exports the Supabase client.
src/index.css: Custom styles for the application.

Backend Structure:
![image](https://github.com/user-attachments/assets/76edc868-f712-48fc-b832-2f9290a1373e)
