import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import validateToken from "./utils/helpers.js";
import envioRouter from "./routes/envio.routes.js";

import dotenv from 'dotenv';
dotenv.config(); 
const app = express();

const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:5173' 
}));

app.use('/api/auth', authRouter);
app.use('/api/envio', /*validateToken,*/ envioRouter);
app.use("/api/users", /*validateToken,*/ userRouter);

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});
