# EchoWave

Modern social media platform powered by the MERN stack plus Socket.IO and AWS S3. EchoWave delivers a responsive feed, profile management, follower graph, search and real-time direct messaging in a single monorepo.

- Frontend preview: https://echowave-8by4.onrender.com  
- API base URL: https://echowave-wxbu.onrender.com

## Highlights
- Protected authentication flow with JWT, bcrypt hashing and persisted sessions via `AuthContext`.
- Infinite-scrolling feed, follow graph, suggestions and profile editing backed by MongoDB models.
- Media uploads routed through AWS S3 presigned URLs (`GET /s3Url`) and in-memory multer buffers.
- Real-time direct messages with Socket.IO, token-based handshake middleware and chat persistence.
- Modular UI built with React Router, Vite, TailwindCSS, shadcn-inspired primitives and Material Tailwind inputs.
- Swagger-ready backend (controllers + routes) for future API documentation.

## Tech Stack
- Frontend: React 18, React Router v6, Context API, socket.io-client, TailwindCSS, Material Tailwind, lucide-react
- Backend: Node.js, Express, MongoDB + Mongoose, Socket.IO server, JWT, bcrypt, multer, validator
- Infrastructure: AWS S3 (uploads), Render/Vercel deployment, Vite dev server
- Tooling: ESLint, Nodemon, Postman, date-fns, Typed.js

## Repository Layout
```
EchoWave/
├─ client/          # React + Vite SPA
│  ├─ src/
│  │  ├─ Components/       # Feed, chat, layout, UI primitives
│  │  ├─ context/          # Auth + Socket providers
│  │  ├─ hooks/            # Auth helpers (login, signup, logout)
│  │  ├─ pages/            # Landing, Profile, Chat, Auth
│  │  ├─ utils/            # Axios + socket clients
│  │  └─ modals/ui data
│  └─ ...
├─ server/          # Express API + Socket.IO
│  ├─ controllers/  # auth, posts, users, messages, search, S3
│  ├─ middleware/   # JWT guard, multer, socket auth
│  ├─ models/       # User, Post, Comment, Message schemas
│  ├─ routes/       # /auth, /user, /post, /search, /messages
│  ├─ s3.js         # S3 client + presign helper
│  └─ index.js      # App bootstrap + socket server
├─ package.json     # Workspace-level dev deps
└─ README.md
```

## Getting Started
### Prerequisites
- Node.js ≥ 18
- npm ≥ 9
- MongoDB cluster URI
- AWS S3 bucket (for profile/post media)

### Installation
```bash
git clone https://github.com/your-username/EchoWave.git
cd EchoWave

# install backend deps
cd server
npm install

# install frontend deps
cd ../client
npm install
```

### Environment Variables
Create `server/.env` with:

```
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=super-secret-value

# AWS S3 (profile & post media)
AWS_BUCKET_NAME_1=your-bucket
AWS_REGION_1=ap-south-1
AWS_ACCESS_KEY_1=AKIAXXX
AWS_SECRET_ACCESS_KEY_1=xxxx

# Optional: override Socket.IO CORS origins
CLIENT_URL=http://localhost:5173
API_URL=http://localhost:5000
```

Frontend network targets live inside `client/src/utils/api.js` and `client/src/utils/socket.js`. Update `baseURL` (REST) and `baseURL/localUrl` (sockets) if you self-host the API.

### Running Locally
Run backend (Mongo instance must be reachable):
```bash
cd server
npm run dev
```

Run frontend:
```bash
cd client
npm run dev
```

- Vite serves at `http://localhost:5173`
- Express + Socket.IO serve at `http://localhost:5000`

### Available Scripts
| Path    | Script          | Description                            |
|---------|-----------------|----------------------------------------|
| client  | `npm run dev`   | Start Vite dev server                  |
| client  | `npm run build` | Production build                       |
| client  | `npm run preview` | Preview built assets                 |
| client  | `npm run lint`  | React ESLint rules                     |
| server  | `npm run dev`   | Nodemon-powered API + Socket.IO        |

## Feature Overview
- **Authentication**: `/auth/signup` supports avatar upload via S3, `/auth/login` issues JWT persisted in `localStorage`. `ProtectedRoute` guards SPA routes.
- **Feed & Posts**: `Posts.jsx` consumes `/post` (global timeline) and `/post/getposts` (following). Users can upload images, create captions, like, unlike and comment.
- **Profiles & Graph**: `/user/:username` endpoints power profile view, follow/unfollow, follower/following modals, suggestions and edit profile flow.
- **Search**: `/search?q=` performs case-insensitive prefix lookup against user display names.
- **Direct Messages**: `/messages/useraccount/:username` returns recent conversation history, while Socket.IO (`chat_message`) pushes real-time updates between peers.
- **Uploads**: `GET /s3Url` returns presigned keys for large media; `multer` handles smaller profile uploads via memory storage.
- **Theming**: `ThemeProvider` exposes light/dark toggle and integrates shadcn-inspired components.

## API Surface (selected)
| Route | Method | Description |
|-------|--------|-------------|
| `/auth/signup` | POST | register user + optional avatar |
| `/auth/login` | POST | login, returns JWT + profile |
| `/user/:username` | POST | fetch profile by handle |
| `/user/userId/:userId` | POST | fetch profile by Mongo ID |
| `/user/:username/follow` | POST | follow target |
| `/user/:username/unfollow` | POST | unfollow target |
| `/user/account/edit` | POST | update bio, name, avatar |
| `/user/secured/suggestedusers` | GET | recommended accounts |
| `/post` | GET/POST | feed fetch, create post with image URL |
| `/post/getposts` | GET | timeline of followed users |
| `/post/:postId/comments` | GET | hydrate comments |
| `/post/:postsId/like` | POST | like a post |
| `/post/:postsId/unlike` | POST | unlike a post |
| `/post/:postsId/addcomment` | POST | add comment |
| `/messages/useraccount/:username` | GET | last 10 DMs with target |
| `/s3Url` | GET | retrieve AWS presigned upload URL |

All mutating routes (except `/auth/*`) require `Authorization: Bearer <token>` and rely on `middleware/authMiddleware.js`.

## Deployment Notes
- Frontend: `client/static.json` + `vercel.json` make it deploy-ready on Vercel; `npm run build` outputs to `dist/`.
- Backend: tested on Render (see allowed origins). Set `origin` whitelist inside `server/index.js` or move to env before deploying elsewhere.
- Remember to configure CORS + Socket.IO origins for your production URLs.

## Author
Surya Pillutla  
Frontend Developer (MERN / TypeScript)  
📧 suryapillutla007@gmail.com  
🌍 https://surya-portfolio-ten.vercel.app/

If EchoWave helps your workflow, drop a ⭐ on the repo!