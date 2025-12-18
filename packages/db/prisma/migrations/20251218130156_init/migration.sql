-- CreateTable
CREATE TABLE "GuestUser" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GuestUser_pkey" PRIMARY KEY ("id")
);
