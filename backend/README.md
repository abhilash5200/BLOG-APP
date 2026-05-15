### Backend development

1.Create git repo
   git init
2.Add gitignore file
3.create .env file for environment variables & READ DATA from .env module
4.generate package.json
5.create express app
6.connect to database
7.add middlewares(body parser,err handling)
8.design schemas and create models
9.design REST APIS for all resources



---

# Backend `README.md`

```md id="w7jlwm"
# BlogSphere Backend 🚀

Backend API for the BlogSphere blogging platform built using Node.js, Express.js, MongoDB, JWT Authentication, Cloudinary, and Mongoose.

---

# Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- BcryptJS
- Cookie Parser
- Multer
- Cloudinary
- CORS

---

# Environment Variables

Create a `.env` file in backend root:

```env
PORT=5000

DB_URL=your_mongodb_connection_string

JWT_SECRET=your_super_secret_key

CLOUD_NAME=your_cloudinary_cloud_name

API_KEY=your_cloudinary_api_key

API_SECRET=your_cloudinary_api_secret

NODE_ENV=production