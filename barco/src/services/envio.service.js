import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getEnviosById(userId) {
    const envio = await prisma.envio.findMany({
        where: {
            userId
        }
    })
    return envio;
}

async function getEnvios() {
    const envios = await prisma.envio.findMany();
    return envios;
}

async function createEnvio(envio) {
    const newEvio = await prisma.envio.create({
        data: {
            cargamento: envio.cargamento,
            peso: parseFloat(envio.peso),
            barco: envio.barco,
            origen: envio.origen,
            destino: envio.destino,
            costo: parseFloat(envio.costo),  
            userId: envio.userId
        }
    });

    return newEvio;
}


export {
    getEnviosById,
    getEnvios,
    createEnvio,
}
