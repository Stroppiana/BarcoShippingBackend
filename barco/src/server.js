import express from "express";
import userRouter from "./routes/user.routes.js"
import authRouter from "./routes/auth.routes.js"
import validateToken from "./utils/helpers.js"

const app = express()

const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded( { extended: true} ));

app.use("/api/users", validateToken ,userRouter)
app.use("/api/auth", authRouter)


app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
})