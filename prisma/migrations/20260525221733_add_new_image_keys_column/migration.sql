-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "imageKeys" JSONB NOT NULL DEFAULT '[]';

-- CreateIndex
CREATE INDEX "Like_userId_isActive_idx" ON "Like"("userId", "isActive");
