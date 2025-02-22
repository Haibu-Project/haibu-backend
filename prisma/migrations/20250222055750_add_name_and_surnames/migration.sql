-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "surnames" TEXT NOT NULL DEFAULT 'Unknown';
