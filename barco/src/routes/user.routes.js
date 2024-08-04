import { Router } from "express";
import { getUsers, createUser, updateUser, deleteUser } from "../services/user.service.js";

const router = Router();

router.get("/",async (request, response) => {

  try{
    const users = await getUsers();
    response.json(users);
  }catch(error){
    console.log(error)
    response.json( {error} )
  }
})


router.get("/:id", (req,res)=>{
    const { id } = req.params

    const user = users.find(user => user.id === Number(id))

    if(!user) return res.status(404).json({ error: "Usuario no encontrado"})

    res.json(user)
})


router.post("/", async (req, res) => {

    const { name, email, password } = req.body;

    if ( !name || !email || !password) return res.status(404).json( {error: "FALTAN DATOS"}); 

    try{
      const user = await createUser( { name, email, password} )
      res.json({ message: "Usuario creado", user })
    }catch(error){
        console.log(error);
        res.json({ error });
    }

})


router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, apellido } = req.body

    if (!id || !nombre || !apellido) return res.status(400).json({ error: "Faltan datos" })

    const userExists = users.find(user => user.id === Number(id))

    if(!userExists) return res.status(404).json({ error: "Usuario no encontrado" })

    const index = users.findIndex(user => user.id === Number(id))
    users[index] = { id: Number(id), nombre, apellido }

    res.json({ message: "User updated", user: { id: Number(id), nombre, apellido }})
})

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    const userExists = users.find(user => user.id === Number(id))

    if(!userExists) return res.status(404).json({ error: "Usuario no encontrado" })

    const index = users.findIndex(user => user.id === Number(id))

    users.splice(index, 1)

    res.json({ message: "Usuario eliminado", user: userExists })
})


export default router;