-- CreateEnum
CREATE TYPE "public"."UserProvider" AS ENUM ('GOOGLE', 'EMAIL');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "photoUrl" TEXT,
ADD COLUMN     "provider" "public"."UserProvider" NOT NULL DEFAULT 'EMAIL',
ALTER COLUMN "password" DROP NOT NULL;
