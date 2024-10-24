# Schooltastic
## Overview
Schooltastic is a comprehensive course management platform designed to streamline the organization of courses and student data for schools. The platform aims to facilitate efficient management for teachers while providing students with access to relevant course details. This platform allows users to manage courses by creating, updating, and deleting them and viewing and searching for faculty as well as students enrolled in the school.
## Screenshots
### Wireframe
![Schooltastic-wireframe drawio](https://github.com/user-attachments/assets/df4d0e50-79c4-49b3-a468-f0b0c9599eed)
### EDR
![Schooltastic-ERD drawio](https://github.com/user-attachments/assets/7478ade2-6f69-4244-a908-7a1e32cb6884)
## User Stories
- **As a user**, I want to create, update, and delete courses so that I can manage my curriculum and class information.
- **As a user**, I want to view the list of students and teachers enrolled in my courses so I can keep track of them.
- **As a user**, I want to search for specific courses by name and see details such as the course code, course schedule, seats available, and duration so I can stay updated.
- **As a user**, I want to search for teachers and students by name to easily find the information I need.
## MVP
### Database
- MongoDB database setup for storing users, courses, and student profiles.
### General Features
- Search for courses by name.
- Login and signup functionality for both students and teachers.
### UI
- User-friendly UI with navigation for teachers and students to manage or view their respective information.
## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Design and Planning**: Draw.io for ERD and wireframes
- **Other Tools**: Google Fonts
## Next Steps
- **User Permissions**: Implement role-based access control to fully distinguish between teachers, students, and admins for CRUD operations.
- **Authentication**: Add secure login functionality with hashed passwords for both teachers and students.
- **Teacher & Student Portals**: Separate the load pages for teachers and students for a more customized experience.
- **Admin Capabilities**: Provide an admin panel for enhanced control over user roles and course management.
- **Enhanced Search**: Improve the search functionality by adding filters (e.g., by schedule, teacher, or course code).
- **Mobile Responsiveness**: Refine the design to ensure a smooth user experience across different device sizes.
- **Separate teacher and student dashboards** with distinct functionality.
### Teacher Features
- Full CRUD (Create, Read, Update, Delete) functionality for managing courses.
- View and manage student lists for courses.
### Student Freatures
- View course details, including teacher info and schedule.
- Edit their own profile (name, email, password, grade level).


 
