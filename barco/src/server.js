import express from "express";
import userRouter from "./routes/user.routes.js"

const app = express()

const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded( { extended: true} ));

app.use("/api/users", userRouter)


app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
})