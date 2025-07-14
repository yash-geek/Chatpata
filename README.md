# Chatpata

A modern, real-time chat application built with React, Vite, Node.js, Socket.io, and MongoDB. Chatpata supports user authentication, group and direct messaging, live user presence, file uploads, and a responsive UI powered by MUI and TailwindCSS.

## Features

- **Real-Time Messaging:** Instant chat powered by Socket.io.
- **User Authentication:** Secure sign-up, login, and JWT-based session management.
- **Group and Direct Chats:** Start private conversations or group discussions.
- **Live User Presence:** See who's online, typing indicators.
- **Media & File Uploads:** Share images and files (Cloudinary integration).
- **Admin Dashboard:** View stats, manage users and chats.
- **Responsive Design:** Mobile-first UI with MUI and TailwindCSS.

## Technologies Used

- **Frontend:** React, Vite, Redux Toolkit, MUI, TailwindCSS, Axios, Chart.js
- **Backend:** Node.js, Express, MongoDB, Mongoose, Socket.io, Cloudinary
- **Testing & Linting:** ESLint, React Testing Library (optional)
- **Dev Tools:** dotenv, Prettier (recommended)

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- MongoDB Atlas or local instance
- [Cloudinary account](https://cloudinary.com/)

### Clone the Repository

```bash
git clone https://github.com/yash-geek/Chatpata.git
cd Chatpata
```

---

### 1. Server Setup

```bash
cd server
npm install
```

#### Create a `.env` file in the `server` directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ADMIN_SECRET_KEY=your_admin_secret_key
NODE_ENV=DEVELOPMENT
```

#### Start the server

```bash
npm run dev   # or npm start
```

---

### 2. Client Setup

```bash
cd ../client
npm install
```

#### Start the client

```bash
npm run dev
```

The client will typically be available at `http://localhost:5173`.

---

## Scripts

### Client

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run lint` — Run ESLint checks
- `npm run preview` — Preview production build

### Server

- `npm run dev` — Start server with hot reload (if set up)
- `npm start` — Start server

---

## Project Structure

```
Chatpata/
  ├─ client/       # React frontend
  └─ server/       # Express backend
```

---

## Contribution

Contributions are welcome! Please open issues or pull requests for new features, bug fixes, or improvements.

1. Fork this repo
2. Create your feature branch (`git checkout -b feature/FeatureName`)
3. Commit your changes (`git commit -m 'Add FeatureName'`)
4. Push to the branch (`git push origin feature/FeatureName`)
5. Open a Pull Request

---

## License

[MIT](LICENSE)

---

## Contact

Created by [@yash-geek](https://github.com/yash-geek) — feel free to reach out for questions or suggestions!