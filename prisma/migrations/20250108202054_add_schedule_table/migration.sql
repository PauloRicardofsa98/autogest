-- CreateEnum
CREATE TYPE "ScheduleStatus" AS ENUM ('PENDING', 'DONE', 'CANCELED');

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "serviceUuid" TEXT NOT NULL,
    "status" "ScheduleStatus" NOT NULL,
    "notes" TEXT,
    "clientUuid" TEXT NOT NULL,
    "vehicleUuid" TEXT NOT NULL,
    "employerUuid" TEXT,
    "dataSaid" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_serviceUuid_fkey" FOREIGN KEY ("serviceUuid") REFERENCES "Service"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_clientUuid_fkey" FOREIGN KEY ("clientUuid") REFERENCES "Client"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_vehicleUuid_fkey" FOREIGN KEY ("vehicleUuid") REFERENCES "Vehicle"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_employerUuid_fkey" FOREIGN KEY ("employerUuid") REFERENCES "Employer"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
