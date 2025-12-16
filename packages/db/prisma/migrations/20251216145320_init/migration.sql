-- CreateTable
CREATE TABLE "GuestUserSession" (
    "sessionId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GuestUserSession_pkey" PRIMARY KEY ("sessionId")
);

-- CreateTable
CREATE TABLE "UntitledCanvas" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guestId" TEXT NOT NULL,

    CONSTRAINT "UntitledCanvas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UntitledCanvas" ADD CONSTRAINT "UntitledCanvas_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "GuestUserSession"("sessionId") ON DELETE CASCADE ON UPDATE CASCADE;
