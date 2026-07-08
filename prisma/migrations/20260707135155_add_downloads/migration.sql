-- CreateEnum
CREATE TYPE "DownloadProduct" AS ENUM ('ARCGIS', 'QGIS');

-- CreateTable
CREATE TABLE "Download" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "product" "DownloadProduct" NOT NULL DEFAULT 'ARCGIS',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Download_pkey" PRIMARY KEY ("id")
);

