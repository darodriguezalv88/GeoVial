-- CreateTable
CREATE TABLE "License" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "License_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activation" (
    "id" TEXT NOT NULL,
    "licenseId" TEXT NOT NULL,
    "machineId" TEXT NOT NULL,
    "activatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "License_key_key" ON "License"("key");

-- CreateIndex
CREATE UNIQUE INDEX "License_email_key" ON "License"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Activation_licenseId_machineId_key" ON "Activation"("licenseId", "machineId");

-- AddForeignKey
ALTER TABLE "Activation" ADD CONSTRAINT "Activation_licenseId_fkey" FOREIGN KEY ("licenseId") REFERENCES "License"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
