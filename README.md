# TASK MANAGER SYSTEM

## Description of the problem

It has been requested by a company the development of an application in Laravel/PHP to manage projects and their respective tasks. The system should have three main entities: users, projects, and tasks, each with their specific fields.

The users entity will store information about the system users, including name, email, and password for authentication.

The projects entity will be responsible for storing project details, such as name, description, expected project resolution date, status, associated image path, and the identifiers of the user who created and updated the project.

Finally, the tasks entity will be used to register tasks related to each project. It will include fields such as name, description, associated image path, status, priority, expected resolution date, identifiers of the users responsible for creating and updating the task, and the identifier of the project to which the task is linked.

In this system, it will be necessary to implement data integrity and consistency of relationships between entities, as well as authorization and authentication mechanisms to ensure that only authorized users can access and modify project and task data.

It will also be necessary to create an intuitive and efficient user interface that allows users to view, create, update, and delete projects and tasks easily and effectively. This may involve the development of features such as filters, sorting, and pagination to handle large volumes of data and facilitate navigation through projects and tasks.

### Environment Specifications:

- neovim 0.9
- JavaScript / React ES6
- PHP / Laravel 8.1.2
- SQLite 3
- npm 10.2.4
- Composer 2.2.6

### Database Tables:

#### Users
- id: integer
- name: string
- email: string
- password: string

#### Projects
- id: integer
- name: string
- description: longText
- due_date: timestamp
- status: string
- img_path: string
- created_by: integer
- updated_by: integer

#### Tasks
- id: integer
- name: string
- description: longText
- img_path: string
- status: string
- priority: string
- due_date: timestamp
- assigned_user_id: integer
- created_by: integer
- updated_by: integer
- project_id: integer

