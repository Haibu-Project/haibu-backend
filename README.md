# 🐝 Haibu - The Future of Decentralized Social Networking 🚀

Haibu is a **community-driven decentralized social network** built on **Celestia**. Unlike traditional platforms, Haibu operates with a **DAO governance model**, giving users control over their data, interactions, and the evolution of the platform.

---

## 🌟 Key Features

- **🗳️ DAO Governance:** Decision-making through $HAI token-based voting.
- **🏆 Gamified Engagement:** Earn $HAI tokens by participating in campaigns.
- **💻 Open-Source Development:** Contribute, solve issues, and get rewarded.
- **💬 Social Interactions:** Post "Hai" (similar to tweets), like, comment, and share content.
- **🔒 Blockchain-Powered Security:** Built on **Celestia** & **Chopin Framework** for transparency and data integrity.
# 🚀 Haibu Backend

This is a **Node.js** backend for a social network, built with **Express.js**, **Prisma**, and **PostgreSQL**. It provides RESTful API endpoints for user authentication, posting content, and interacting with the platform.

## 📂 Project Structure
```
/social-network-backend
 ├── prisma/                  # Prisma configuration
 │   ├── schema.prisma        # Database schema
 │   ├── migrations/          # Migrations
 │
 ├── src/
 │   ├── config/              # Environment and security settings
 │   ├── database/            # Prisma instance setup
 │   ├── modules/             # Feature-based modules (users, posts, auth, etc.)
 │   ├── middleware/          # Global middleware (error handling, auth)
 │   ├── index.ts             # Main entry point
 │
 ├── .env                     # Environment variables
 ├── package.json             # Project configuration
 ├── tsconfig.json            # TypeScript settings
 ├── Dockerfile               # Deployment configuration
 ├── docker-compose.yml       # PostgreSQL container setup
```

---

## 🚀 Getting Started
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/villarley/social-network-backend.git
cd social-network-backend
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Configure the Environment**
Create a `.env` file in the root directory and add:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/social_network"
PORT=5000
JWT_SECRET="super_secret_key"
```

### **4️⃣ Start PostgreSQL with Docker**
```sh
docker-compose up -d
```

### **5️⃣ Apply Migrations**
```sh
npm run migrate
npm run generate
```

### **6️⃣ Run the Server**
#### **Development Mode**
```sh
npm run dev
```

#### **Production Mode**
```sh
npm run build
npm start
```

---

## 📌 Available Scripts
| Command | Description |
|---------|------------|
| `npm run dev` | Runs the server in development mode with hot reload. |
| `npm run start` | Starts the server in production mode. |
| `npm run build` | Compiles TypeScript into JavaScript. |
| `npm run migrate` | Runs Prisma migrations. |
| `npm run generate` | Generates Prisma types. |
| `npm run db-push` | Syncs Prisma schema with the database. |
| `npm run db-seed` | Seeds the database with initial data. |
| `npm run lint` | Runs ESLint to check code quality. |
| `npm run format` | Formats the code using Prettier. |

---

## 🛠️ API Endpoints
### **Users**
| Method | Endpoint | Description |
|--------|---------|-------------|
| `GET` | `/api/users` | Fetch all users |
| `POST` | `/api/users` | Create a new user |

### **Authentication**
| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/api/auth/login` | Authenticate user and return JWT |
| `POST` | `/api/auth/register` | Register a new user |

### **Posts**
| Method | Endpoint | Description |
|--------|---------|-------------|
| `GET` | `/api/posts` | Fetch all posts |
| `POST` | `/api/posts` | Create a new post |

---

## 📦 Deployment
This project can be deployed using Docker:
```sh
docker build -t social-network-backend .
docker run -p 5000:5000 social-network-backend
```

Or deploy via a cloud platform like **Heroku**, **Render**, or **AWS**.

---

## 👥 Contributors
- **Villarley** - [GitHub Profile](https://github.com/villarley)

---

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

