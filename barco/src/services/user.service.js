import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getUsers() {
    const users = await prisma.user.findMany();
    return users;
}

async function createUser(user) {
    const newUser = await prisma.user.create({
        data:{
            email: user.email,
            name: user.name,
            password: user.password
        }
    });

    return newUser;
}

async function updateUser(id, user) {
    const newUser = await prisma.user.update({
        where:{
            id
        },

        select: {
            email: user.email,
            name: user.name
        }
    });

    return newUser;
}

async function deleteUser(id) {
    const user = await prisma.user.delete({
        where: {
            id
        }
    });

    return user;
}

export {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
}

