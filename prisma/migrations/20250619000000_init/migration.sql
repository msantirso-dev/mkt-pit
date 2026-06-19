-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT,
    "company" TEXT,
    "role" TEXT,
    "city" TEXT,
    "profile" TEXT NOT NULL,
    "projectType" TEXT NOT NULL,
    "projectStage" TEXT NOT NULL,
    "projectTiming" TEXT NOT NULL,
    "interests" JSONB NOT NULL,
    "technicalScore" INTEGER NOT NULL DEFAULT 0,
    "commercialScore" INTEGER NOT NULL DEFAULT 0,
    "leadTemperature" TEXT NOT NULL DEFAULT 'Frío',
    "status" TEXT NOT NULL DEFAULT 'Nuevo',
    "notes" TEXT,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestAnswer" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "questionKey" TEXT NOT NULL,
    "questionText" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "TestAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResourceAccess" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "resourceName" TEXT NOT NULL,
    "accessedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResourceAccess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminNote" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminNote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TestAnswer_leadId_idx" ON "TestAnswer"("leadId");

-- CreateIndex
CREATE INDEX "ResourceAccess_leadId_idx" ON "ResourceAccess"("leadId");

-- CreateIndex
CREATE INDEX "AdminNote_leadId_idx" ON "AdminNote"("leadId");

-- AddForeignKey
ALTER TABLE "TestAnswer" ADD CONSTRAINT "TestAnswer_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceAccess" ADD CONSTRAINT "ResourceAccess_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminNote" ADD CONSTRAINT "AdminNote_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
