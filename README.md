# Meteor Blaze Todo App

A full-stack Todo application built with Meteor.js and Blaze templating engine.

## Live Demo
🔗 https://congenial-space-adventure-7vv649wq7vp72rg46-3000.app.github.dev

> ⚠️ **Important Note about Live URL:**
> This app is hosted on GitHub Codespaces which is a cloud development environment.
> The live URL may show a 404 error if the Codespace is inactive/sleeping.
> **If the live URL doesn't work, please run locally using the steps below — it takes less than 5 minutes.**

## Screenshots (App Working Proof)

### Login Page
![Login Page](screenshots/Screenshot%202026-06-18%20090841.png)

### Task List with Categories
![Task List](screenshots/Screenshot%202026-06-18%20092855.png)

### Drag and Drop Reordering
![Drag and Drop](screenshots/Screenshot%202026-06-18%20092910.png)

### Task Completion
![Task Completion](screenshots/Screenshot%202026-06-18%20092924.png)

## Features
- ✅ User authentication (Sign up / Login)
- ✅ Add, complete, and delete tasks
- ✅ Task Categories: Work, Personal, Urgent, Other
- ✅ Drag-and-Drop reordering of tasks
- ✅ Filter tasks by category
- ✅ Clear completed tasks
- ✅ Per-user task isolation

## Tech Stack
- Meteor.js 3.4
- Blaze templating
- MongoDB
- HTML5 Drag & Drop API

## How to Run Locally (If Live URL is Down)

### Step 1 — Install Meteor
```bash
curl https://install.meteor.com/ | sh
```

### Step 2 — Clone and Run
```bash
git clone https://github.com/Varshithachinthala/meteor-todo-app
cd meteor-todo-app
export PATH="$HOME/.meteor:$PATH"
meteor
```

### Step 3 — Open Browser
Go to http://localhost:3000

### Step 4 — Create Account
- Click "Sign In" → "Create Account"
- Register with any email and password
- Start using the app!

## Usage
1. Create an account or sign in
2. Add tasks with categories (Work, Personal, Urgent, Other)
3. Filter tasks by category using the filter buttons
4. Drag and drop tasks to reorder them
5. Check tasks to mark as complete
6. Use "Clear Completed" to remove finished tasks

## Note
A WebSocket HMR warning popup may appear occasionally in development mode.
Simply close it by clicking ✕ — all features work correctly after closing.
