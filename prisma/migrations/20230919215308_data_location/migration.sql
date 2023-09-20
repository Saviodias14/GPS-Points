/*
  Warnings:

  - You are about to drop the column `device_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `hex_location` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "device_id",
DROP COLUMN "hex_location";

-- CreateTable
CREATE TABLE "locations" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "device_id" VARCHAR(255) NOT NULL,
    "date" BIGINT NOT NULL,
    "direction" DECIMAL(5,2) NOT NULL,
    "distance" BIGINT NOT NULL,
    "time" BIGINT NOT NULL,
    "valuesComposition" VARCHAR(255)[],
    "speed" DECIMAL(5,2) NOT NULL,
    "latitude" DECIMAL(8,6) NOT NULL,
    "longitude" DECIMAL(9,6) NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
