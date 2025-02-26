/*
  Warnings:

  - You are about to drop the column `walletAddress` on the `Click` table. All the data in the column will be lost.
  - Added the required column `email` to the `Click` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Click" DROP COLUMN "walletAddress",
ADD COLUMN     "email" TEXT NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
