-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "barcode" TEXT,
ALTER COLUMN "sku" DROP NOT NULL;
