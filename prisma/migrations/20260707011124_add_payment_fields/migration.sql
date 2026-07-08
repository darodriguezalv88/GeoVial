-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('MONTHLY', 'ANNUAL');

-- CreateEnum
CREATE TYPE "LicenseStatus" AS ENUM ('ACTIVE', 'PAST_DUE', 'CANCELED', 'EXPIRED');

-- AlterTable
ALTER TABLE "License" ADD COLUMN     "currentPeriodEnd" TIMESTAMP(3),
ADD COLUMN     "lsCustomerId" TEXT,
ADD COLUMN     "lsSubscriptionId" TEXT,
ADD COLUMN     "plan" "Plan",
ADD COLUMN     "status" "LicenseStatus" NOT NULL DEFAULT 'EXPIRED';

-- CreateIndex
CREATE UNIQUE INDEX "License_lsSubscriptionId_key" ON "License"("lsSubscriptionId");

