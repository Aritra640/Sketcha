-- CreateTable
CREATE TABLE "Collab" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Collab_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Collab" ADD CONSTRAINT "Collab_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
