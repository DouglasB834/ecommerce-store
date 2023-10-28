/*
  Warnings:

  - You are about to drop the column `imgUrls` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "imgUrls",
ADD COLUMN     "imageUrls" TEXT[];
