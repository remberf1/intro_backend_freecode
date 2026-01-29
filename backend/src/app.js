import express from 'express';

const app = express(); //create express app


app.use(express.json()); //middleware to parse json requests

import userRoutes from './routes/user.route.js';
// import postRoutes from './routes/post.routes.js';

app.use("/api/v1/users", userRoutes);
// app.use("/api/v1/posts", postRoutes);


export default app;