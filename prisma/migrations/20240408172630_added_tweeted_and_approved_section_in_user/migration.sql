/*
  Warnings:

  - Added the required column `approved` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tweeted` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "approved" INTEGER NOT NULL,
ADD COLUMN     "tweeted" INTEGER NOT NULL;
