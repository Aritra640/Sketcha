/*
  Warnings:

  - A unique constraint covering the columns `[userId,title]` on the table `Canvas` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `type` on the `Shape` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ToolType" AS ENUM ('image', 'more', 'rect', 'cursor', 'line', 'pen', 'erasure', 'arrow', 'hand', 'circle', 'text', 'none');

-- AlterTable
ALTER TABLE "Shape" DROP COLUMN "type",
ADD COLUMN     "type" "ToolType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Canvas_userId_title_key" ON "Canvas"("userId", "title");
