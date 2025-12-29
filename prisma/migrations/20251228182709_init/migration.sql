-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OK', 'NOK', 'CRITICAL');

-- CreateTable
CREATE TABLE "Inspection" (
    "id" SERIAL NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "inspector" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Inspection_pkey" PRIMARY KEY ("id")
);
