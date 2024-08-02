-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" "Rol" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Barco" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,

    CONSTRAINT "Barco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Envio" (
    "id" SERIAL NOT NULL,
    "cargamento" TEXT NOT NULL,
    "peso" INTEGER NOT NULL,
    "barcoId" INTEGER,
    "origen" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "costo" DECIMAL(65,30) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Envio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Envio" ADD CONSTRAINT "Envio_barcoId_fkey" FOREIGN KEY ("barcoId") REFERENCES "Barco"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Envio" ADD CONSTRAINT "Envio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
