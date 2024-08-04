import { Router } from "express";
import { getUserByEmail } from "../services/user.service.js";
import { generateAccesToken } from "../utils/helpers.js";
import { Rol } from "@prisma/client";

const router = Router();

router.post("/login", async (req, res) =>{
    const { email, password } = req.body;

    if(!email || !password) return res.status(400).json( {message: "Datos incorrectos"})

    try{
        const user = await getUserByEmail(email);

        if(!user) return res.status(404).json( { message: "Usuario NO existe" })

        if(user.password != password) return res.status(404).json( { message: "Clave incorrecta" })

        const token = generateAccesToken(email, user.rol);

        res.json({
           user: {
            email: user.email,
            name: user.name
           },
           token
        })

    }catch(error){
        console.log(error)
        res.status(500).json({ message: "ERROR"})
    }
})

export default router;