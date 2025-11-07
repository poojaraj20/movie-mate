# 📽️ MovieMate — Movie & TV Show Tracker

MovieMate is a **MERN stack** web application that lets users **add, edit, rate, and track** their favorite movies and TV shows across streaming platforms like Netflix, Prime Video, and Disney+.

Users can:

- Add movies/TV shows with title, director, genre, platform, and status  
- Rate and review watched content  
- Edit or delete existing entries  
- View full movie details with ratings displayed as stars  

---

## Tech Stack

| Layer           | Technology                                         |
| --------------- | -------------------------------------------------- |
| **Frontend**    | React.js (Vite / CRA)                              |
| **Backend**     | Node.js + Express.js                               |
| **Database**    | MongoDB Atlas                                      |
| **ORM**         | Mongoose                                           |
| **Styling**     | Bootstrap / Custom CSS                             |
| **State Mgmt.** | React Hooks (`useState`, `useEffect`, `useParams`) |

---

## ⚙️ Installation & Setup Guide

> **Note:** These commands assume you have Node.js and npm installed.  
> If not, install Node.js from [https://nodejs.org/](https://nodejs.org/)

---

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/movie-mate.git
cd movie-mate 
```


### 2️⃣ Backend Setup

### Install Dependencies

```bash
cd backend
npm install
```

### Create Environment File

Create a file named `.env` inside the `backend/` folder with the following content:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
```

### Start Backend Server

```bash
npm start
```
## 3️⃣ MongoDB Atlas Setup (if you don’t already have one)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free **shared cluster**
3. Add a **Database User** (username & password)
4. Go to **Network Access → Add IP**  
   - Add your IP **or**  
   - Use `0.0.0.0/0` for open access (for testing only)
5. Copy your **Connection String**:  
   - Cluster → Connect → Drivers → Copy URI
6. Paste it in your `.env` file as `MONGO_URI`

## 4️⃣ Frontend Setup

In a new terminal:

```bash
cd ..
npm install
npm run dev
```

## 5️⃣ API Endpoints

| Method | Endpoint           | Description            |
|--------|------------------|------------------------|
| GET    | `/api/movies`     | Fetch all movies       |
| GET    | `/api/movies/:id` | Get a movie by ID      |
| POST   | `/api/movies`     | Add a new movie        |
| PUT    | `/api/movies/:id` | Update movie details   |
| DELETE | `/api/movies/:id` | Delete a movie         |

## Author

Pooja Raj  
Master of Computer Science (DA), Full Stack Developer  
poojavani2001@gmail.com    
GitHub: [https://github.com/poojaraj20](https://github.com/poojaraj20)







