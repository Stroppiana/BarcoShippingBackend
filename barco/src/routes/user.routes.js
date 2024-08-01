import { Router } from "express";

const router = Router();

const users = [
    { id: 1, nombre: "Cosme", apellido: "Fulanito" },
    { id: 2, nombre: "Lalo", apellido: "Landa" },
    { id: 3, nombre: "Mel", apellido: "Patiño" },
    { id: 4, nombre: "Lisa", apellido: "Simpson" }
]

router.get("/", (request, response) => {

    response.json(users)
})


router.get("/:id", (req,res)=>{
    const { id } = req.params

    const user = users.find(user => user.id === Number(id))

    if(!user) return res.status(404).json({ error: "User NOT found"})

    res.json(user)
})


router.post("/", (req, res) => {

    const { id, nombre, apellido } = req.body;

    if ( !id || !nombre || !apellido) return res.status(404).json( {error: "FALTAN DATOS"}); 

    users.push({
        id,
        nombre,
        apellido
    })
    res.json({ message: "User created", user: {id, nombre, apellido}})

})


router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, apellido } = req.body

    if (!id || !nombre || !apellido) return res.status(400).json({ error: "Faltan datos" })

    const userExists = users.find(user => user.id === Number(id))

    if(!userExists) return res.status(404).json({ error: "User not found" })

    const index = users.findIndex(user => user.id === Number(id))
    users[index] = { id: Number(id), nombre, apellido }

    res.json({ message: "User updated", user: { id: Number(id), nombre, apellido }})
})

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    const userExists = users.find(user => user.id === Number(id))

    if(!userExists) return res.status(404).json({ error: "User not found" })

    const index = users.findIndex(user => user.id === Number(id))
    
    users.splice(index, 1)

    res.json({ message: "User deleted", user: userExists })
})


export default router;