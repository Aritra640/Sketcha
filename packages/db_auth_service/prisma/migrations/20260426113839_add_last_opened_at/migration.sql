-- AlterTable
ALTER TABLE "Canvas" ADD COLUMN     "lastOpenedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "AnonymousPaste" (
    "id" TEXT NOT NULL,

    CONSTRAINT "AnonymousPaste_pkey" PRIMARY KEY ("id")
);
