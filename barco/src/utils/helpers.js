import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

export function generateAccesToken( email, rol){
    const payload = { email, rol };
    const options = { expiresIn: "1h" };

    return jwt.sign(payload, process.env.JWT_SECRET, options);
}

export default function validateToken(req, res, next){
    const accessToken = req.headers["authorization"]

    if(!accessToken){
        return res.status(401).json( { message: "Acceso no autorizado"} )
    }

    try{
        const token = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.user = token;
        next()
    }catch(error){
        return res.status(401).json( { message: "Tokken no valido"} )
    }

}