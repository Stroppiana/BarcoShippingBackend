import { Router } from "express";
import { getEnviosById, getEnvios, createEnvio } from "../services/envio.service.js";

const router = Router();

router.get("/", async (req, res) => {

    try{
        const envios = await getEnvios();
        res.json(envios);
    }catch(error){
        console.log(error);
        res.json( {error} );
    }
})

// router.get("/user/:userId", async (req, res) => {
//     const { userId } = req.params;
  
//     try {
//       const envios = await getEnviosById(Number(userId));
//       if (envios.length === 0) {
//         return res.status(404).json({ error: "NO HAY ENVIOS REALIZADOS POR ESTE USUARIO" });
//       }
//       res.json(envios);
//     } catch (error) {
//       console.log(error);
//       res.json({ error });
//     }
//   });

router.get('/user', async (req, res) => {
    const { userId } = req.query; // Aquí obtienes el userId desde la query string
  
    if (!userId) {
      return res.status(400).json({ error: 'userId es requerido' });
    }
  
    try {
      const envios = await getEnviosById(Number(userId));
      if (envios.length === 0) {
        return res.status(404).json({ error: 'NO HAY ENVIOS REALIZADOS POR ESTE USUARIO' });
      }
      res.json(envios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los envíos' });
    }
  });
  

router.post("/", async (req, res) => {
    const { cargamento, peso, barco, origen, destino, costo, userId } = req.body;

    if ( !cargamento || !peso || !barco || !origen || !destino || !costo || !userId) return res.status(404).json( { error: "FALTAN DATOS ENVIO"})

        try {
            console.log('Datos recibidos:', { cargamento, peso, barco, origen, destino, costo, userId }); 
            const envio = await createEnvio({ cargamento, peso: parseFloat(peso), barco, origen, destino, costo: parseFloat(costo), userId });
            res.json({ message: "Envio creado", envio });
          } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error al crear el envío",  envio});
          }  

});


router.put("/:id", (req, res) =>{
    const { id } = req.params;
    const { cargamento, peso, barco, origen, destino, costo, userId} = req.body;

    if ( !id || !cargamento || !peso || !barco || !origen || !destino || !costo || !userId) return res.status(404).json( { error: "FALTAN DATOS ENVIO"})

    const envioExists = envios.find(envio => envio.id === Number(id))

    if(!envioExists) return res.status(404).json({ error: "Envio no encontrado" })
    
    const index = envios.findIndex( envio => envio.id === Number(id))
    envios[index] = { id: Number(id), cargamento, peso, barco, origen, destino, costo, userId }

    res.json( { message: "Envio updated", envio: { id: Number(id), cargamento, peso, barco, origen, destino, costo, userId}})

})

export default router;