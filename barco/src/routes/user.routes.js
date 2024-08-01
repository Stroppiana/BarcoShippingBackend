import {Router} from "express";

const router = Router();


router.get("/", (request, response) =>{

    const user = {
        nombre:"Cosme",
        apellido:"Flanito"
    }
    response.json(user)

})

export default router;