-- CreateEnum
CREATE TYPE "Brand" AS ENUM ('FIAT', 'FORD', 'GM', 'VOLKSWAGEN', 'HONDA', 'YAMAHA', 'SUZUKI', 'KAWASAKI', 'BMW', 'MERCEDES', 'AUDI', 'VOLVO', 'SCANIA', 'IVECO', 'RENAULT', 'PEUGEOT', 'CITROEN', 'HYUNDAI', 'KIA', 'TOYOTA', 'NISSAN', 'MITSUBISHI', 'JEEP', 'LAND_ROVER', 'PORSCHE', 'LAMBORGHINI', 'FERRARI', 'MASERATI', 'BUGATT');

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "brand" "Brand" NOT NULL,
    "year" INTEGER,
    "color" TEXT,
    "clientUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_clientUuid_fkey" FOREIGN KEY ("clientUuid") REFERENCES "Client"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
