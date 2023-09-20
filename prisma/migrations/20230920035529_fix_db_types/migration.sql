/*
  Warnings:

  - You are about to alter the column `date` on the `locations` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `distance` on the `locations` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `time` on the `locations` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "locations" ALTER COLUMN "date" SET DATA TYPE INTEGER,
ALTER COLUMN "distance" SET DATA TYPE INTEGER,
ALTER COLUMN "time" SET DATA TYPE INTEGER,
ALTER COLUMN "latitude" SET DATA TYPE DECIMAL(9,6),
ALTER COLUMN "longitude" SET DATA TYPE DECIMAL(10,6);
