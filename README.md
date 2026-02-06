🏥 Hospicare – Hospital Management System

Hospicare is a full-stack hospital management web application built using the MERN stack.
It helps patients book appointments and allows admins to manage doctors, appointments, messages, and users from a separate dashboard.


🚀 Live Project Structure

This repository contains three main folders:

hospicare/

│

├── backend/     → Node.js + Express API

├── frontend/    → Patient-facing website (React)

└── dashboard/   → Admin dashboard (React)

✨ Features
👨‍⚕️ Patient (Frontend)

User registration & login

Book doctor appointments

View appointment status

Contact hospital (messages)

Secure authentication using JWT


🧑‍💼 Admin (Dashboard)

Admin login

Add / update / delete doctors

View and manage appointments

View patient messages

Role-based authentication (Admin only)


⚙️ Backend

REST APIs for frontend & dashboard

JWT-based authentication

Role-based access control (Admin / Patient)

MongoDB database integration

Secure cookies & tokens

Deployed-ready (Vercel supported)


🛠️ Tech Stack
Frontend & Dashboard

React (Vite)

Axios

React Router

Context API

CSS / Tailwind (if applicable)

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT (Authentication)

Cookie-parser

dotenv

Deployment

Frontend: Vercel

Dashboard: Vercel

Backend: Vercel / Render

Database: MongoDB Atlas


📂 Folder Details

📁 backend/

backend/

├── api/

├── controller/

├── router/

├── models/

├── middlewares/

├── database/

├── utils/

├── config/

├── app.js

├── server.js

└── vercel.json



📁 frontend/

frontend/

├── src/

├── public/

├── .env

├── index.html

└── vite.config.js



📁 dashboard/

dashboard/

├── src/

├── public/

├── .env

├── index.html

└── vite.config.js



🔐 Environment Variables

Backend (backend/.env)

PORT=5000

MONGO_URI=mongodb+srv://rashid:rashid@cluster0.k82k0.mongodb.net/?retryWrites=true

JWT_SECRET=asjhdkjahkdlfhksahfksad

FRONTEND_URL=https://hospicarefrontend.vercel.app/

DASHBOARD_URL=https://hospicaredashboard.vercel.app/login


Frontend (frontend/.env)
VITE_BACKEND_URL=

Dashboard (dashboard/.env)
VITE_BACKEND_URL= 


▶️ How to Run Locally

1️⃣ Clone the Repository

git clone https://github.com/RashidR18/hospicare.git
cd hospicare


2️⃣ Run Backend

cd backend

npm install

npm run dev



Backend will run on:

http://localhost:5000


3️⃣ Run Frontend

cd frontend

npm install

npm run dev


Frontend runs on:

http://localhost:5173


4️⃣ Run Dashboard

cd dashboard

npm install

npm run dev


Dashboard runs on:

http://localhost:5174


🌐 Deployment Notes

All three parts (backend, frontend, dashboard) are deployed separately

Backend uses vercel.json for deployment

Cookies are handled securely for production

Token-based login is used for Safari & cross-browser support


🧪 Authentication Flow

Login generates JWT token

Token stored securely (cookie / header)

Role-based middleware protects admin routes

Separate tokens for Admin and Patient


📸 Screenshots

<img width="944" height="448" alt="home" src="https://github.com/user-attachments/assets/c56c6ff7-43b3-436f-967b-aa3b579a69f7" />
<img width="934" height="440" alt="appointment_section" src="https://github.com/user-attachments/assets/56032933-b994-4908-b653-928d3ee892b4" />
<img width="937" height="437" alt="home_message" src="https://github.com/user-attachments/assets/7d8d880b-5ece-4acf-913a-2d95a6a12c6f" />
<img width="932" height="434" alt="login" src="https://github.com/user-attachments/assets/9b0f13ce-bff9-47a1-8362-9bdf8756b32c" />
<img width="926" height="437" alt="sign_up" src="https://github.com/user-attachments/assets/a18daf65-be24-4a30-9308-f18f24a9274a" />
<img width="932" height="425" alt="about" src="https://github.com/user-attachments/assets/19295c29-ff4d-4df7-855c-ace2767d1a12" />
<img width="779" height="233" alt="footer" src="https://github.com/user-attachments/assets/115ffe86-2159-46be-85c2-311f17836214" />


🚧 Future Improvements

Online payment integration

Doctor availability calendar

Email notifications

Role-based permissions

Better UI/UX


👨‍💻 Author

Rashid Ali

Full Stack Developer (MERN)


⭐ Support

If you like this project, please ⭐ star the repository and share it!
