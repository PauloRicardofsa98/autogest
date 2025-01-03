/*
  Warnings:

  - Added the required column `cpfCnpj` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "cpfCnpj" TEXT NOT NULL,
ADD COLUMN     "observations" TEXT;
