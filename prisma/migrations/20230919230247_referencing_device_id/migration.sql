/*
  Warnings:

  - You are about to drop the column `user_id` on the `locations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[device_id]` on the table `locations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `device_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "locations" DROP CONSTRAINT "locations_user_id_fkey";

-- AlterTable
ALTER TABLE "locations" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "device_id" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "locations_device_id_key" ON "locations"("device_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "locations"("device_id") ON DELETE RESTRICT ON UPDATE CASCADE;
