# MERN Todo App 📝

A full-stack Todo application built with MongoDB, Express, React, and Node.js featuring advanced task management capabilities, authentication, and analytics.

## Features ✨

- **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **Task Management**: Create, read, update, and delete tasks
- **Task Properties**: 
  - Due dates for deadline tracking
  - Priority levels (Low, Medium, High)
  - Task completion status
- **Edit Tasks**: Update task details with a beautiful modal interface
- **Dashboard with Charts**: 
  - Pie charts for task distribution by priority
  - Bar charts for completion status
  - Progress circles showing completion percentage
  - Task statistics (total, completed, pending, overdue)
- **Search & Filter**: Find tasks by title/description and filter by priority
- **Email Notifications**: Automated emails when tasks are created
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Dark Theme**: Modern dark gradient UI with glass morphism effects

## 🌐 Live Demo

To see the app in action locally, follow the [Installation](#installation) and [Running the Application](#running-the-application-) sections below.

**Want to deploy your own version?** Check out these free deployment options:
- **Frontend**: [Vercel](https://vercel.com) • [Netlify](https://netlify.com) • [Firebase Hosting](https://firebase.google.com/products/hosting)
- **Backend**: [Railway](https://railway.app) • [Render](https://render.com) • [Heroku](https://heroku.com) • [Vercel Functions](https://vercel.com/docs/concepts/functions/serverless-functions)

## Tech Stack 🛠️

**Frontend:**
- React.js
- Tailwind CSS
- Axios for API calls
- Recharts for data visualization
- Material-UI Icons

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Nodemailer for email notifications

## Installation 🚀

### 1. Clone the Repository
```bash
git clone https://github.com/Carnage0070/todoapp.git
cd todoapp
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

## Configuration ⚙️

Create a `.env` file inside the `backend` directory with the following variables:

```env
MONGO_URI=your_mongodb_connection_uri
GMAIL_USERNAME=your_gmail_email@gmail.com
GMAIL_PASSWORD=your_app_specific_password
PORT=8001
JWT_SECRET=your_random_secret_key_here
```

### Get Gmail App Password:
1. Go to [Google Account Settings](https://myaccount.google.com)
2. Navigate to Security
3. Enable 2-Step Verification
4. Go to App Passwords and generate a password for Mail/Windows Computer
5. Use this password in `GMAIL_PASSWORD`

## Running the Application 🏃

### Start Backend Server
```bash
cd backend
node server.js
```
Backend runs on: `http://localhost:8001`

### Start Frontend Server
In a new terminal:
```bash
cd frontend
npm start
```
Frontend runs on: `http://localhost:3000`

## API Endpoints 📡

### Authentication
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - Login user
- `GET /api/user/getUser` - Get current user

### Tasks
- `POST /api/task/addTask` - Create new task
- `GET /api/task/getTask` - Get all user tasks
- `PUT /api/task/updateTask` - Update task details or completion status
- `GET /api/task/removeTask` - Delete task

### Forgot Password
- `POST /api/forgotPassword/forgotPassword` - Request password reset
- `POST /api/forgotPassword/resetPassword` - Reset password with token

## Project Structure 📁

```
mern-todo-app/
├── backend/
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── taskController.js
│   │   └── forgotPasswordController.js
│   ├── middleware/
│   │   └── requireAuth.js
│   ├── models/
│   │   ├── userModel.js
│   │   └── taskModel.js
│   ├── routes/
│   │   ├── userRoute.js
│   │   ├── taskRoute.js
│   │   └── forgotPassword.js
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Dashboard/
    │   │   ├── Task/
    │   │   ├── createTask/
    │   │   ├── Header/
    │   │   └── ...
    │   ├── context/
    │   ├── reducer/
    │   └── App.js
    └── package.json
```

## Usage 🎯

1. **Register/Login**: Create an account or login with existing credentials
2. **Create Tasks**: Click "Create Task" to add a new todo with title, description, due date, and priority
3. **Manage Tasks**: 
   - Check boxes to mark tasks as complete
   - Click edit icon to modify task details
   - Click delete icon to remove tasks
4. **Filter & Search**: Use the search bar and priority filter to find specific tasks
5. **View Dashboard**: Navigate to Dashboard to see charts, statistics, and progress

## Future Enhancements 🔮

- Task categories/tags
- Recurring tasks
- Task reminders and notifications
- Subtasks
- Collaborative sharing
- Dark/Light theme toggle
- Mobile app (React Native)

## Contributing 🤝

Feel free to fork this repository and submit pull requests for any improvements.

## License 📄

This project is open source and available under the MIT License.

## Support 💬

For issues or questions, please create an issue on GitHub: [https://github.com/Carnage0070/todoapp/issues](https://github.com/Carnage0070/todoapp/issues)


